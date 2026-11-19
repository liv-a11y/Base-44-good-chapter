import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  OPEN_STATE,
  VISIBLE,
  findChapter,
  guestByToken,
  personSaidYes,
} from "@/lib/guest-fns";
import { createPaymentSession } from "@/lib/payments";

const money = (value) => Math.round((Number(value) || 0) * 100) / 100;

/**
 * Opens checkout for one guest. Everything that decides the amount is read here
 * from the approved chapter, never from the browser: an individual item costs
 * its approved price, and a pooled item can only take what is still missing.
 */
export const startGuestCheckout = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string().trim().min(12).max(64),
      item_id: z.string().trim().min(1).max(64),
      amount: z.number().min(1).max(100000).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return { ok: false, reason: "closed" };

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter || chapter.state !== OPEN_STATE || !personSaidYes(chapter)) {
      return { ok: false, reason: "closed" };
    }

    const item = await service.entities.Item.get(data.item_id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!item || item.chapter_id !== chapter.id || !VISIBLE.includes(item.status)) {
      return { ok: false, reason: "closed" };
    }

    const pooled = item.giving_mode === "pool";
    let amount = 0;

    if (pooled) {
      const target = Number(item.pool_target) || 0;
      if (target <= 0) return { ok: false, reason: "closed" };

      const paidPage = await service.entities.Contribution.filter(
        { item_id: item.id, status: "paid" },
        { limit: 200 },
      );
      const collected = (paidPage.items ?? paidPage).reduce(
        (sum, row) => sum + (row.amount || 0),
        0,
      );
      const remaining = money(target - collected);
      if (remaining <= 0) return { ok: false, reason: "full" };

      amount = money(Math.min(data.amount ?? 0, remaining));
      if (amount < 1) return { ok: false, reason: "amount" };
    } else {
      const takenPage = await service.entities.Claim.filter({ item_id: item.id }, { limit: 1 });
      if ((takenPage.items ?? takenPage).length) return { ok: false, reason: "taken" };

      amount = money(item.price);
      if (!amount || amount < 1) return { ok: false, reason: "amount" };
    }

    let session;
    try {
      session = await createPaymentSession(service, {
        amount,
        itemName: item.name,
        successPath: `/guest/${data.token}`,
      });
    } catch (error) {
      if (error?.code === "amount_below_minimum") return { ok: false, reason: "amount" };
      return {
        ok: false,
        reason: error?.code === "payments_not_connected" ? "payments_off" : "checkout_failed",
      };
    }

    await service.entities.Contribution.create({
      chapter_id: chapter.id,
      item_id: item.id,
      guest_id: guest.id,
      display_name: guest.name || "",
      amount,
      kind: pooled ? "pool" : "individual",
      status: "pending",
      payment_reference: session.reference || "",
    });

    return { ok: true, url: session.url, amount };
  });

// A guest coming back from checkout is settled by getGuestChapter, which asks
// the provider about anything still open before it answers.