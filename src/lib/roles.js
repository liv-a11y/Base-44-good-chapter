// Good Chapter roles and what each one can see or do.
// One source of truth for prototypes now and database rules later.
export const ROLES = {
    initiator: { label: "Initiator", who: "A friend, teammate, manager, or agent.", access: "Company email or magic link." },
    recipient: { label: "The person", who: "The one the chapter is for. Holds the final say.", access: "Private one-time link. No account." },
    guest: { label: "Guest", who: "Family, friends, teammates in the circle.", access: "Email check. No account." },
    partner_admin: { label: "Partner admin", who: "Employer HR or a brokerage lead who funds the pool.", access: "Company sign-in." },
    concierge: { label: "Concierge", who: "The Good Chapter desk.", access: "Staff sign-in. Every action logged." },
    maker: { label: "Maker or retailer option", who: "Where gifts come from.", access: "Order status only." },
    cause: { label: "Cause partner", who: "DonorsChoose or a chosen local nonprofit.", access: "Batch statements only." },
};
export const CAN_SEE = {
    initiator: ["chapter_category", "draft_gifts", "approved_gifts", "claim_status"],
    recipient: ["chapter_category", "draft_gifts", "approved_gifts", "recipient_swaps", "shipping_address", "guest_notes"],
    guest: ["approved_gifts", "claim_status"],
    partner_admin: ["pool_totals", "chapter_counts", "give_back_totals"],
    concierge: ["chapter_category", "approved_gifts", "claim_status", "order_status", "audit_log"],
    maker: ["order_status"],
    cause: ["give_back_totals"],
};
export const CAN_DO = {
    initiator: ["start_chapter", "edit_draft"],
    recipient: ["approve_gifts", "swap_gift", "close_quietly", "enter_address"],
    guest: ["claim_gift", "leave_note"],
    partner_admin: ["set_pool_rules", "export_counts"],
    concierge: ["resolve_stock", "override_with_reason"],
    maker: ["confirm_fulfillment"],
    cause: ["confirm_cause_use"],
};
export const canSee = (r, f) => CAN_SEE[r].includes(f);
export const canDo = (r, a) => CAN_DO[r].includes(a);
export const TRANSITIONS = [
    { from: "started", to: "in_review", by: "initiator" },
    { from: "in_review", to: "circle_open", by: "recipient" },
    { from: "in_review", to: "closed_quietly", by: "recipient" },
    { from: "circle_open", to: "fulfilled", by: "maker" },
    { from: "fulfilled", to: "reconciled", by: "concierge" },
];
export const canMove = (r, from, to) => TRANSITIONS.some((t) => t.from === from && t.to === to && t.by === r);
// Pool money is only drawn when the person approves.
export const drawsFromPool = (to) => to === "circle_open";
export const FIELD_LABEL = {
    chapter_category: "Chapter category",
    draft_gifts: "Draft gifts",
    approved_gifts: "Approved gifts",
    claim_status: "Claimed or open",
    guest_notes: "Guest notes",
    recipient_swaps: "Swaps the person made",
    shipping_address: "Shipping address",
    pool_totals: "Pool totals",
    chapter_counts: "Chapter counts",
    give_back_totals: "Give back totals",
    audit_log: "Audit log",
    order_status: "Order status",
};
