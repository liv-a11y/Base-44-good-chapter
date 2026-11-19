import { isCheckoutPaid } from "@/lib/payments";

const rowsOf = (page) => page?.items ?? page ?? [];

/**
 * Marks one contribution paid and, when it bought a whole item, takes that item.
 * Running it twice grants nothing the second time.
 */
const grant = async (service, row) => {
  await service.entities.Contribution.update(row.id, {
    status: "paid",
    paid_at: new Date().toISOString(),
  });

  if (row.kind !== "individual") return;

  const taken = rowsOf(await service.entities.Claim.filter({ item_id: row.item_id }, { limit: 1 }));
  if (taken.length) return;

  await service.entities.Claim.create({
    chapter_id: row.chapter_id,
    item_id: row.item_id,
    guest_id: row.guest_id,
    display_name: row.display_name || "",
    claimed_at: new Date().toISOString(),
  });
};

/** Only the provider's answer counts. A checkout left open stays pending. */
const settle = async (service, rows) => {
  let settled = 0;

  for (const row of rows) {
    if (row.status !== "pending" || !row.payment_reference) continue;
    if (!(await isCheckoutPaid(service, row.payment_reference))) continue;
    await grant(service, row);
    settled += 1;
  }

  return settled;
};

/** One guest's own open checkouts, asked about when their page opens. */
export const settleGuestContributions = async (service, guestId) => {
  const page = await service.entities.Contribution.filter(
    { guest_id: guestId, status: "pending" },
    { limit: 10 },
  );
  return settle(service, rowsOf(page));
};

/** Every open checkout, for the payment event that arrives whether or not the guest came back. */
export const sweepPendingContributions = async (service) => {
  const page = await service.entities.Contribution.filter({ status: "pending" }, { limit: 100 });
  return settle(service, rowsOf(page));
};