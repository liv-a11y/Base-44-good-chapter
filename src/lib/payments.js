/**
 * The one place card checkout is opened and confirmed. Base44 Payments holds the
 * account, so no key lives here. Amounts always arrive from the server, which
 * reads them from the approved chapter, never from the browser.
 */
export const paymentsReady = () => true;

/** Opens a checkout for one contribution and returns its id and redirect. */
export const createPaymentSession = async (service, { amount, itemName, successPath }) => {
  const checkout = await service.payments.createCheckout({
    items: [{ name: itemName, amount: Math.round(amount * 100), quantity: 1 }],
    success_path: successPath,
  });

  return { reference: checkout.checkout_id, url: checkout.redirect_url };
};

/** Asks the provider whether one checkout was really paid. */
export const isCheckoutPaid = async (service, checkoutId) => {
  if (!checkoutId) return false;

  const purchases = await service.payments.listPurchases({ checkout_id: checkoutId });
  const rows = purchases?.items ?? purchases ?? [];
  return rows[0]?.status === "paid";
};