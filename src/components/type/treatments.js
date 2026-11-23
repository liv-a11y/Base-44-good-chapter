/** The copy every sheet sets. Real brand lines, so the faces are judged in situ. */
export const SAMPLE = {
  kicker: "Since 1924, nobody asks.",
  head: "you shouldn't have to get married to get a f$%#ng toaster.",
  lede: "Good Chapter is making it easier to show up for the life that's actually happening.",
  cta: "Request an invitation",
  ctaAlt: "See Maya's chapter",
  quote: "A friend starts it. The person approves it. Nobody asks.",
  itemName: "Brass desk lamp",
  itemWhy: "Because she reads until midnight and never bought herself a light.",
  itemPrice: "$168",
  itemSource: "Schoolhouse",
};

/**
 * One treatment per face combination. Everything but the type stays put:
 * the sheet reads these variables and sets nothing else.
 */
export const TREATMENTS = [
  {
    id: "current",
    name: "Current",
    note: "Fraunces headline · EB Garamond body · DM Sans labels",
    vars: {
      "--t-head": "var(--font-heading)",
      "--t-body": "var(--font-body)",
      "--t-aside": "var(--font-heading)",
      "--t-label": "var(--font-sans)",
      "--t-head-lead": "1.02",
    },
  },
  {
    id: "handwritten-headline",
    name: "Handwritten headline",
    note: "Raw Serif headline · EB Garamond body",
    vars: {
      "--t-head": '"Raw Serif"',
      "--t-body": "var(--font-body)",
      "--t-aside": '"Raw Serif"',
      "--t-label": "var(--font-sans)",
      "--t-head-lead": "1.08",
      "--t-head-track": "-0.005em",
    },
  },
  {
    id: "handwritten-asides",
    name: "Handwritten asides",
    note: "Fraunces headline · EB Garamond body · Raw Serif quote",
    vars: {
      "--t-head": "var(--font-heading)",
      "--t-body": "var(--font-body)",
      "--t-aside": '"Raw Serif"',
      "--t-label": "var(--font-sans)",
      "--t-head-lead": "1.02",
    },
  },
  {
    id: "handwritten-throughout",
    name: "Handwritten throughout",
    note: "Raw Serif headline and body",
    vars: {
      "--t-head": '"Raw Serif"',
      "--t-body": '"Raw Serif"',
      "--t-aside": '"Raw Serif"',
      "--t-label": "var(--font-sans)",
      "--t-head-lead": "1.1",
      "--t-head-track": "0em",
      "--t-body-size": "21px",
      "--t-body-lead": "1.4",
    },
  },
  {
    id: "handwritten-tight",
    name: "Handwritten, set tight",
    note: "Raw Serif headline at tight leading · EB Garamond body",
    vars: {
      "--t-head": '"Raw Serif"',
      "--t-body": "var(--font-body)",
      "--t-aside": '"Raw Serif"',
      "--t-label": "var(--font-sans)",
      "--t-head-lead": "0.94",
      "--t-head-track": "-0.02em",
      "--t-body-size": "18px",
    },
  },
];