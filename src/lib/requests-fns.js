import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireUser } from "@/lib/auth-middleware";

/** Only the curator works here. Entity rules already gate the desk; this is the door. */
const serviceFor = (context) => {
  if (context.user?.role !== "admin") {
    throw Object.assign(new Error("The curator desk is for the curator"), {
      status: 403,
      code: "FORBIDDEN",
    });
  }
  return context.getBase44().asServiceRole;
};

export const listRequests = createServerFn({ method: "GET" })
  .middleware([requireUser])
  .handler(async ({ context }) => {
    const service = serviceFor(context);
    const page = await service.entities.Waitlist.list({ sort: "-created_date", limit: 200 });
    const rows = page.items ?? page;

    return rows.map((row) => ({
      id: row.id,
      email: row.email,
      interest: row.interest,
      comments: row.comments || "",
      submitted: row.created_date || "",
      acknowledged_on: row.acknowledged_at || "",
      replied_on: row.reply_sent_at || "",
    }));
  });

/**
 * The receipt, for a request that went in while email was not yet set up.
 * Nothing is stamped unless the send actually went.
 */
export const sendReceipt = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(z.object({ id: z.string().min(1).max(64) }))
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const record = await service.entities.Waitlist.get(data.id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!record) return { sent: false, message: "That request is gone." };

    try {
      await service.integrations.Core.SendEmail({
        to: record.email,
        template_name: "PartnerAcknowledgment",
        variables: { interest: record.interest, app_url: "https://goodchaptercollective.com" },
        category: "transactional",
        from_name: "Good Chapter Co.",
      });
    } catch (error) {
      return { sent: false, message: error?.message || "The receipt did not send." };
    }

    const acknowledged_at = new Date().toISOString();
    await service.entities.Waitlist.update(record.id, { acknowledged_at });
    return { sent: true, acknowledged_at };
  });

/**
 * The curator's own words, sent as the follow-up template. The note is a single
 * paragraph in the letter, so line breaks close up before it goes out.
 */
export const sendPartnerReply = createServerFn({ method: "POST" })
  .middleware([requireUser])
  .validator(
    z.object({
      id: z.string().min(1).max(64),
      note: z.string().trim().min(1).max(1500),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = serviceFor(context);

    const record = await service.entities.Waitlist.get(data.id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!record) return { sent: false, message: "That request is gone." };

    try {
      await service.integrations.Core.SendEmail({
        to: record.email,
        template_name: "PartnerFollowUp",
        variables: { interest: record.interest, note: data.note.replace(/\s+/g, " ") },
        category: "transactional",
        from_name: "Good Chapter Co.",
      });
    } catch (error) {
      return { sent: false, message: error?.message || "That reply did not send." };
    }

    const replied_at = new Date().toISOString();
    await service.entities.Waitlist.update(record.id, { reply_sent_at: replied_at });
    return { sent: true, replied_at };
  });