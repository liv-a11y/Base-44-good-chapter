import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";

const EIGHT = 8;

/** Only the curator works here. Entity rules already gate the desk; this is the door. */
const serviceFor = (context) => {
  if (context.user?.role !== "admin") {
    throw Object.assign(new Error("The product library is for the curator"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
  return context.getBase44().asServiceRole;
};

const hostOf = (value) => {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const webLink = z
  .string()
  .trim()
  .max(600)
  .refine((value) => !value || /^https?:\/\//i.test(value), "A link starts with https://");

const productFields = z.object({
  name: z.string().trim().min(1).max(140),
  description: z.string().trim().max(600),
  retailer: z.string().trim().max(120),
  category: z.string().trim().max(40),
  price: z.number().min(0).max(100000).nullable(),
  product_url: webLink,
  affiliate_url: webLink,
  photo_url: z.string().trim().max(600),
  note: z.string().trim().max(400),
});

const pageOf = (result) => result.items ?? result;

/**
 * The library, read the way the curator browses it: a text search, one shelf,
 * one status. Filtered on the server so the desk never loads everything.
 */
export const listAffiliateProducts = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .validator(
    z.object({
      query: z.string().trim().max(80).optional(),
      category: z.string().trim().max(40).optional(),
      status: z.string().trim().max(20).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const query = {};
    if (data.status) query.status = data.status;
    if (data.category) query.category = data.category;

    const page = await service.entities.AffiliateProduct.filter(query, {
      sort: "-created_date",
      limit: 300,
    });
    const rows = pageOf(page);

    const needle = (data.query || "").trim().toLowerCase();
    const found = needle
      ? rows.filter((row) =>
          [row.name, row.retailer, row.category, row.description]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(needle),
        )
      : rows;

    // Every shelf and status count comes from the unfiltered set, so the tabs
    // do not shrink as the curator narrows the search.
    const all = await service.entities.AffiliateProduct.filter({}, { limit: 300 });
    const everything = pageOf(all);

    return {
      rows: found.map((row) => ({
        id: row.id,
        name: row.name,
        description: row.description || "",
        retailer: row.retailer || hostOf(row.product_url),
        category: row.category || "",
        price: row.price ?? null,
        product_url: row.product_url || "",
        affiliate_url: row.affiliate_url || "",
        photo_url: row.photo_url || "",
        status: row.status || "proposed",
        note: row.note || "",
        is_sample: Boolean(row.is_sample),
      })),
      categories: [...new Set(everything.map((row) => row.category).filter(Boolean))].sort(),
      counts: {
        all: everything.length,
        proposed: everything.filter((row) => (row.status || "proposed") === "proposed").length,
        approved: everything.filter((row) => row.status === "approved").length,
        retired: everything.filter((row) => row.status === "retired").length,
      },
    };
  });

export const saveAffiliateProduct = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(productFields.extend({ id: z.string().trim().max(64).optional() }))
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const record = {
      name: data.name,
      description: data.description,
      retailer: data.retailer || hostOf(data.product_url),
      category: data.category,
      price: data.price,
      product_url: data.product_url,
      affiliate_url: data.affiliate_url,
      photo_url: data.photo_url,
      note: data.note,
    };

    if (data.id) {
      const existing = await service.entities.AffiliateProduct.get(data.id).catch((error) => {
        if (error?.status === 404) return null;
        throw error;
      });
      if (!existing) return { ok: false };
      await service.entities.AffiliateProduct.update(data.id, record);
      return { ok: true, id: data.id };
    }

    const created = await service.entities.AffiliateProduct.create({
      ...record,
      status: "proposed",
      is_sample: false,
    });
    return { ok: true, id: created.id };
  });

export const setAffiliateStatus = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      id: z.string().min(1),
      status: z.enum(["proposed", "approved", "retired"]),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);
    await service.entities.AffiliateProduct.update(data.id, { status: data.status });
    return { ok: true };
  });

export const deleteAffiliateProduct = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);
    await service.entities.AffiliateProduct.delete(data.id);
    return { ok: true };
  });

/**
 * Put a library product into a chapter's draft list. The affiliate link becomes
 * the item's source link; the curator still writes why it suits this person.
 */
export const useProductInChapter = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      product_id: z.string().min(1),
      chapter_id: z.string().min(1),
      why: z.string().trim().min(1).max(600),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const product = await service.entities.AffiliateProduct.get(data.product_id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!product) throw Object.assign(new Error("That product is not in the library"), { status: 404 });

    const chapter = await service.entities.Chapter.get(data.chapter_id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!chapter) throw Object.assign(new Error("That chapter is gone"), { status: 404 });

    const existing = await service.entities.Item.filter(
      { chapter_id: chapter.id },
      { limit: 20 },
    );
    const rows = pageOf(existing);
    if (rows.length >= EIGHT) {
      throw Object.assign(new Error("Eight is the limit"), { status: 400 });
    }

    const sourceUrl = product.affiliate_url || product.product_url || "";
    await service.entities.Item.create({
      chapter_id: chapter.id,
      position: rows.length + 1,
      name: product.name,
      photo_url: product.photo_url || "",
      price: product.price ?? 0,
      source: product.retailer || hostOf(sourceUrl),
      source_url: sourceUrl,
      why: data.why,
      status: "proposed",
    });

    return { ok: true, chapter_id: chapter.id };
  });