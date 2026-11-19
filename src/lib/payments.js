/**
 * The one place card checkout is opened and confirmed. Card payments are not
 * connected to this app yet, so every call reports not ready and nothing is
 * ever charged. When the provider is connected this is the only file that
 * changes: the amounts, the records and the guest screens stay as they are.
 */
export const paymentsReady = () => false;

export const createPaymentSession = async () => {
  throw Object.assign(new Error("Card checkout is not connected yet"), {
    status: 503,
    code: "PAYMENTS_OFF",
  });
};

export const verifyPayment = async () => null;