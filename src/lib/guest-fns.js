import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Guests only ever see a chapter once it has gone out to them. */
const OPEN_STATE = "sent_to_guests";

/** The person's yes is the only thing that makes an item visible to guests. */
const VISIBLE = ["approved", "given"];

const guestByToken = async (service, token) => {
  const page = await service.entities.Guest.filter({ guest_token: token }, { limit: 1 });
  return (page.items ?? page)[0] ?? null;
};

const findChapter = (service, id) =>
  service.entities.Chapter.get(id).catch((error) => {
    if (error?.status === 404) return null;
    throw error;
  });

/**
 * One guest's private link. The token is the only key, so this runs as the
 * operator and returns nothing but the approved list and who has taken what.
 */
export const getGuestChapter = createServerFn({ method: "GET" })
  .validator(z.object({ token: z.string().trim().min(12).max(64) }))
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return null;

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter) return null;

    const itemPage = await service.entities.Item.filter(
      { chapter_id: chapter.id },
      { sort: "position", limit: 8 },
    );
    const claimPage = await service.entities.Claim.filter(
      { chapter_id: chapter.id },
      { limit: 50 },
    );
    const claims = claimPage.items ?? claimPage;

    return {
      person_name: chapter.person_name,
      starter_name: chapter.starter_name || "A friend",
      chapter_type: chapter.chapter_type,
      state: chapter.state,
      open: chapter.state === OPEN_STATE,
      guest_name: guest.name,
      items: (itemPage.items ?? itemPage)
        .filter((item) => VISIBLE.includes(item.status))
        .map((item) => {
          const claim = claims.find((row) => row.item_id === item.id);
          return {
            id: item.id,
            name: item.name,
            photo_url: item.photo_url || "",
            price: item.price ?? null,
            source: item.source || "",
            why: item.why || "",
            claim: claim
              ? {
                  display_name: claim.display_name || "",
                  mine: claim.guest_id === guest.id,
                }
              : null,
          };
        }),
    };
  });

/**
 * A guest takes one item. The token proves who they are, the claim is refused
 * if anything already holds that item, and the name they pick is stored with it.
 * An empty name is how someone gives without being named.
 */
export const claimItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: z.string().trim().min(12).max(64),
      item_id: z.string().trim().min(1).max(64),
      display_name: z.string().trim().max(60),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const guest = await guestByToken(service, data.token);
    if (!guest) return { ok: false };

    const chapter = await findChapter(service, guest.chapter_id);
    if (!chapter || chapter.state !== OPEN_STATE) return { ok: false };

    const item = await service.entities.Item.get(data.item_id).catch((error) => {
      if (error?.status === 404) return null;
      throw error;
    });
    if (!item || item.chapter_id !== chapter.id || !VISIBLE.includes(item.status)) {
      return { ok: false };
    }

    const takenPage = await service.entities.Claim.filter({ item_id: item.id }, { limit: 2 });
    if ((takenPage.items ?? takenPage).length) return { ok: false };

    await service.entities.Claim.create({
      chapter_id: chapter.id,
      item_id: item.id,
      guest_id: guest.id,
      display_name: data.display_name,
      claimed_at: new Date().toISOString(),
    });

    return { ok: true, display_name: data.display_name };
  });