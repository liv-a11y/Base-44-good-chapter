export const CHAPTER_TYPES = [
  "First home, alone",
  "Divorce",
  "Coming out",
  "After a health scare",
  "Moving in together",
  "New city",
  "New job",
  "A big lifestyle change",
  "Adoption",
  "Retirement",
  "Something else",
];

/** How the starter opens the chapter: one gift they would give first, or an amount they build inside. */
export const CHAPTER_PATHS = ["anchor_gift", "employer_pool", "realtor_budget"];

/** The two paths that start from a set amount instead of an anchor gift. */
export const BUDGET_PATHS = ["employer_pool", "realtor_budget"];

export const PATH_LABELS = {
  anchor_gift: "An anchor gift",
  employer_pool: "A pool from work",
  realtor_budget: "A realtor budget",
};

export const CHAPTER_STATES = [
  "started",
  "curating",
  "with_person_items",
  "with_person_guests",
  "sent_to_guests",
  "closed",
  "declined",
];

export const CHAPTER_STATE_LABELS = {
  started: "Started",
  curating: "Curating",
  with_person_items: "With the person, on the list",
  with_person_guests: "With the person, on the guests",
  sent_to_guests: "Sent to the guests",
  closed: "Closed",
  declined: "Declined",
};

/** The person answers first: pending, accepted, or sent back. */
export const DECISION_LABELS = {
  pending: "Waiting on the person",
  accepted: "Person said yes",
  declined: "Sent back by the person",
};

/** The one button the desk offers: the next state, and what to call it. */
export const NEXT_STEP_LABELS = {
  started: "Curating",
  curating: "With the person",
  with_person_items: "With the person: guests",
  with_person_guests: "To the guests",
  sent_to_guests: "Close the chapter",
};