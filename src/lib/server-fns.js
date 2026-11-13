import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { CHAPTER_TYPES } from "@/lib/chapter-types";

export const getServerInfo = createServerFn({ method: "GET" }).handler(async () => ({
  renderedAt: new Date().toISOString(),
}));

const email = z
  .string()
  .trim()
  .min(3)
  .max(160)
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Needs an email address");

const guest = z.object({
  name: z.string().trim().min(1).max(80),
  email,
});

const newChapter = z.object({
  personName: z.string().trim().min(1).max(80),
  personEmail: email,
  chapterType: z.enum(CHAPTER_TYPES),
  alwaysWears: z.string().trim().max(300),
  rewatches: z.string().trim().max(300),
  neverBuys: z.string().trim().max(300),
  starterName: z.string().trim().min(1).max(80),
  starterEmail: email,
  guests: z.array(guest).max(40),
});

const reference = () =>
  `GC-${Math.random().toString(36).slice(2, 5).toUpperCase()}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;

/**
 * The starter flow writes one chapter plus its guest list. The starter does not
 * hold an account, so this runs as the operator and stores the submission for
 * the curator. Nothing is emailed from here.
 */
export const startChapter = createServerFn({ method: "POST" })
  .validator(newChapter)
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const chapter = await service.entities.Chapter.create({
      person_name: data.personName,
      person_email: data.personEmail,
      chapter_type: data.chapterType,
      starter_name: data.starterName,
      starter_email: data.starterEmail,
      always_wears: data.alwaysWears,
      rewatches: data.rewatches,
      never_buys: data.neverBuys,
      state: "started",
      is_sample: false,
      reference: reference(),
    });

    if (data.guests.length) {
      await service.entities.Guest.bulkCreate(
        data.guests.map((row) => ({
          chapter_id: chapter.id,
          name: row.name,
          email: row.email,
          approved: false,
        })),
      );
    }
    return { reference: chapter.reference, id: chapter.id };
  });

/** The seeded sample chapter, shown on the home page with its SAMPLE label. */
export const getSampleChapter = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const service = context.getBase44().asServiceRole;
  const chapters = await service.entities.Chapter.filter({ is_sample: true }, { limit: 1 });
  const chapter = chapters.items?.[0] ?? chapters[0];
  if (!chapter) return null;

  const items = await service.entities.Item.filter(
    { chapter_id: chapter.id },
    { sort: "position", limit: 8 },
  );
  const rows = items.items ?? items;

  return {
    person_name: chapter.person_name,
    chapter_type: chapter.chapter_type,
    story_line: chapter.story_line,
    items: rows.map((item) => ({
      name: item.name,
      photo_url: item.photo_url,
      price: item.price,
      source: item.source,
      why: item.why,
    })),
  };
});