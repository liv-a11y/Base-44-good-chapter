/**
 * The free employer library. Short, practical resources for managers,
 * teammates, and HR. Every one follows the same rule as the product:
 * the person says yes first.
 *
 * Block kinds: "p" (paragraph), "lines" (things to say, shown as quotes),
 * "list" (plain bullets), "steps" (numbered), "pairs" (retire this / say this).
 */
export const LIBRARY_NAME = "Chapter Notes";

export const MOMENTS = [
  { key: "found-out", label: "I just found out" },
  { key: "confidence", label: "They told me in confidence" },
  { key: "team", label: "The team wants to do something" },
  { key: "month", label: "It has been a month" },
];

export const RESOURCES = [
  {
    slug: "ask-first",
    title: "Ask First",
    line: "Three ways to ask before you do anything.",
    audience: "Manager",
    time: "2 min",
    format: "Script",
    moments: ["found-out", "team"],
    blocks: [
      { kind: "p", text: "Use one of these in private, in person or by direct message. Then stop talking." },
      {
        kind: "lines",
        items: [
          "I heard about the house. Would you like the team to mark it, or would you like it kept quiet? Either is fine.",
          "You mentioned your dad is moving in. Is that something you want people to know?",
          "A few of us would like to send something. Yes, no, or not now all work.",
        ],
      },
      { kind: "p", text: "If they say no, say “Got it” and never raise it again. Do not tell the team they declined." },
    ],
  },
  {
    slug: "the-quiet-yes",
    title: "The Quiet Yes",
    line: "What consent sounds like, and what it does not.",
    audience: "Manager",
    time: "5 min",
    format: "One-pager",
    moments: ["found-out", "confidence"],
    blocks: [
      {
        kind: "lines",
        heading: "A yes sounds like",
        items: ["Yes, that would be nice.", "Sure, you can tell the team.", "I’d like that. Keep it small."],
      },
      {
        kind: "list",
        heading: "These are not a yes",
        items: [
          "Silence.",
          "“Oh, you don’t have to.”",
          "“Whatever you think.”",
          "A laugh and a change of subject.",
          "A yes given in front of other people.",
        ],
      },
      {
        kind: "lines",
        heading: "When you are not sure, ask once more, plainly",
        items: ["I want to get this right. Should I go ahead, or leave it?"],
      },
      {
        kind: "list",
        heading: "A yes has edges. Ask about them.",
        items: [
          "Who can know? The team, the department, nobody.",
          "What can be said? “Moving” is different from “moving after a divorce.”",
          "For how long? A yes in March is not a yes in June.",
        ],
      },
      {
        kind: "p",
        heading: "A yes can be taken back",
        text: "If they change their mind, stop. No questions, no explanation owed.",
      },
    ],
  },
  {
    slug: "a-dad-moving-in",
    title: "A Dad Moving In",
    line: "A parent moves in. Here is what a good manager does in the first two weeks.",
    audience: "Manager",
    time: "5 min",
    format: "Checklist",
    moments: ["found-out"],
    blocks: [
      {
        kind: "steps",
        items: [
          "Ask first. Do not assume it is good news or bad news.",
          "Ask what the next two weeks look like. Listen for appointments, moving days and school runs.",
          "Offer one specific thing: a moved deadline, a covered meeting, a later start.",
          "Point them to HR for what leave and flexibility exist. Do not make them hunt for it.",
          "If they said yes to the team knowing, keep it to one line. No details.",
          "Put a reminder on your calendar for one month out.",
        ],
      },
    ],
  },
  {
    slug: "what-not-to-say",
    title: "What Not to Say",
    line: "Ten lines to retire, and what to say instead.",
    audience: "Team",
    time: "2 min",
    format: "One-pager",
    moments: ["found-out", "team"],
    blocks: [
      {
        kind: "pairs",
        items: [
          ["Everything happens for a reason.", "I’m sorry. That is a lot."],
          ["At least…", "Nothing. Skip the silver lining."],
          ["I know exactly how you feel.", "I can’t know what this is like for you."],
          ["Let me know if you need anything.", "I can take Thursday’s meeting. Want me to?"],
          ["You’re so strong.", "You don’t have to hold it together here."],
          ["When are you two having kids?", "Nothing. Not your question."],
          ["I never would have guessed.", "Thank you for telling me."],
          ["What happened?", "You don’t need to explain."],
          ["You must be so excited.", "How are you feeling about it?"],
          ["Are you back to normal yet?", "Good to see you."],
        ],
      },
      {
        kind: "p",
        heading: "The rule under all ten",
        text: "Do not tell someone how to feel. Do not make them manage your reaction.",
      },
    ],
  },
  {
    slug: "the-one-month-check",
    title: "The One Month Check",
    line: "Everyone else has moved on. You have not forgotten.",
    audience: "Manager",
    time: "2 min",
    format: "Script",
    moments: ["month"],
    blocks: [
      { kind: "p", text: "The first week gets the cards. Week five gets nothing. That is when a short check matters most." },
      {
        kind: "lines",
        heading: "Set a calendar reminder for one month out. Then say one of these, in private",
        items: [
          "It’s been about a month. How is it going, really?",
          "I haven’t forgotten about the move. Anything getting harder that I can make easier?",
          "No need to answer. I’m still thinking about you.",
        ],
      },
      {
        kind: "list",
        heading: "Then",
        items: [
          "Listen. Do not fix.",
          "If they name something practical, act on it this week.",
          "If they say “I’m fine,” believe them and leave the door open: “Good. It stays open.”",
        ],
      },
      {
        kind: "p",
        heading: "Do not",
        text: "Ask in a meeting. Ask for an update to pass along. Ask twice in the same week.",
      },
    ],
  },
  {
    slug: "notes-that-land",
    title: "Notes That Land",
    line: "Five openers for a card, so you stop staring at it.",
    audience: "Team",
    time: "2 min",
    format: "Printable",
    moments: ["team"],
    blocks: [
      { kind: "p", text: "A good note is short and specific. Pick an opener and finish it in your own words." },
      {
        kind: "lines",
        items: [
          "I keep thinking about…",
          "One thing I’ve always noticed about you is…",
          "I don’t know the right thing to say, so I’ll say this:",
          "I hope this next part brings you…",
          "No need to write back. I wanted you to know…",
        ],
      },
      {
        kind: "list",
        heading: "Three rules",
        items: [
          "Two sentences is enough.",
          "Write about them, not about you.",
          "Sign your name. “The team” is nobody.",
        ],
      },
    ],
  },
];

/** Written, waiting on review or design. Shown as titles only. */
export const COMING_NEXT = [
  "The Support Gap Audit",
  "Last Day, Done Well",
  "Keys on Your Own",
  "The Chapter Calendar",
];

export const findResource = (slug) => RESOURCES.find((r) => r.slug === slug);
