/**
 * The three setup questions, written for the chapter type. The wording is the
 * category's, the three answers land in the same fields, so the desk and the
 * person's page read one shape whatever was asked.
 */
const SETS = {
  "First home, alone": {
    cues: [
      {
        question: "What do they wear like a uniform?",
        hint: "The jacket they never take off. The same boots from October to March.",
        placeholder: "The same grey wool coat, every day, from the start of October.",
      },
      {
        question: "What runs in the background at their place?",
        hint: "The show, the record, the radio station that is always on.",
        placeholder: "The same cooking show, from the start, every winter.",
      },
      {
        question: "What is still missing from the first place?",
        hint: "The thing they keep saying they will get when there is money.",
        placeholder: "A proper lamp for the corner that is always dark.",
      },
    ],
    dig: "the exact corner of the new place that is still not sorted out",
  },
  Divorce: {
    cues: [
      {
        question: "What is only theirs now?",
        hint: "The one thing they kept because it was never shared.",
        placeholder: "The pan their grandmother cooked in.",
      },
      {
        question: "How does an ordinary Tuesday go in the new place?",
        hint: "Not the big plans. The night that actually happens.",
        placeholder: "Soup, the same three albums, bed by ten.",
      },
      {
        question: "What came with them from the old life and no longer fits?",
        hint: "Something they keep meaning to replace and do not.",
        placeholder: "Two of everything in the kitchen and room for one.",
      },
    ],
    dig: "the object from the old life they are holding on to, and why",
  },
  "Coming out": {
    cues: [
      {
        question: "What do they wear when they feel most like themselves?",
        hint: "Not the safe outfit. The one they choose when nobody is telling them what to be.",
        placeholder: "The green shirt with the wrong collar, worn out.",
      },
      {
        question: "What are they into right now that nobody has caught up with?",
        hint: "The band, the film, the whole world they are three months deep in.",
        placeholder: "Nothing but one album and one terrible film, on repeat.",
      },
      {
        question: "What have they been putting off buying for themselves?",
        hint: "Something they have looked at twice and left in the cart.",
        placeholder: "Proper boots, because the cheap ones keep letting water in.",
      },
    ],
    dig: "the thing they have been circling for a while and not bought",
  },
  "After a health scare": {
    cues: [
      {
        question: "What do they keep on them every day now?",
        hint: "Ordinary things only. The jacket, the bag, the notebook.",
        placeholder: "The same canvas bag, every single day.",
      },
      {
        question: "What is a slow morning at their place like?",
        hint: "The chair, the cup, the part of the day that belongs to nobody.",
        placeholder: "One cup, the crossword, the kitchen radio.",
      },
      {
        question: "What would make a normal week easier?",
        hint: "Nothing medical. The small friction they have stopped mentioning.",
        placeholder: "A second chair so they can sit down while things cook.",
      },
    ],
    dig: "the small daily friction they have stopped mentioning",
  },
  "Moving in together": {
    cues: [
      {
        question: "Whose things won in the new place?",
        hint: "Two of everything, and only one of them survived.",
        placeholder: "Her mugs. His record player. Nothing else agreed on.",
      },
      {
        question: "What do the two of them do on a Sunday?",
        hint: "The routine they already have together, before anyone planned it.",
        placeholder: "Long breakfast, one argument about the paper, a walk.",
      },
      {
        question: "What are they both refusing to buy?",
        hint: "The shared thing neither of them wants to be the one to choose.",
        placeholder: "A sofa. Neither will pick one.",
      },
    ],
    dig: "the shared thing neither of them wants to be the one to choose",
  },
  "New city": {
    cues: [
      {
        question: "What did they carry from the old place?",
        hint: "The object that made the new place feel less temporary.",
        placeholder: "The same two framed photos, still unhung.",
      },
      {
        question: "How do they spend a first Saturday somewhere new?",
        hint: "The habit they are trying to keep in a place that does not know it yet.",
        placeholder: "One long walk, then nothing until dinner.",
      },
      {
        question: "What is still in a box?",
        hint: "The thing with no obvious place in the new rooms.",
        placeholder: "All the kitchen things that do not fit the new drawers.",
      },
    ],
    dig: "the thing still in a box with no obvious place in the new rooms",
  },
  "New job": {
    cues: [
      {
        question: "What do they actually wear to work?",
        hint: "Not the first week. The version that settled in.",
        placeholder: "One blazer over the same three shirts.",
      },
      {
        question: "What do they do the night before a big day?",
        hint: "The small routine that gets them through it.",
        placeholder: "Everything laid out, shoes by the door, no dinner.",
      },
      {
        question: "What would make the working week feel less borrowed?",
        hint: "The thing they use every day that belongs to somebody else or nobody.",
        placeholder: "A bag that holds a laptop and does not hurt.",
      },
    ],
    dig: "the thing they use every day that does not feel like theirs",
  },
  "A big lifestyle change": {
    cues: [
      {
        question: "What is different about them this year?",
        hint: "The change that is already visible to anyone who knows them.",
        placeholder: "They are outside now. Every day, in any weather.",
      },
      {
        question: "What is the new routine?",
        hint: "What replaced the thing that stopped.",
        placeholder: "Early walk, plain breakfast, no coffee after eleven.",
      },
      {
        question: "What did they give up and quietly miss?",
        hint: "Nothing they would take back. Just something nobody replaced.",
        placeholder: "Long dinners. They have not sat at a table in months.",
      },
    ],
    dig: "what the change quietly took away that nobody replaced",
  },
  Adoption: {
    cues: [
      {
        question: "What is the household always short of?",
        hint: "The thing that disappears twice a week.",
        placeholder: "Cups. They are down to two and both are chipped.",
      },
      {
        question: "What do they do together that has nothing to do with the day to day?",
        hint: "The ritual that is theirs and not about the schedule.",
        placeholder: "Saturday pancakes, badly, in the same pan.",
      },
      {
        question: "What do they never buy for themselves anymore?",
        hint: "Everything goes to the household first now.",
        placeholder: "Anything that is only for them.",
      },
    ],
    dig: "the ritual the household has that is theirs and not about the schedule",
  },
  Retirement: {
    cues: [
      {
        question: "What do they wear now that nobody tells them to?",
        hint: "The clothes that only exist because the week is theirs.",
        placeholder: "The same soft cardigan, every morning, all year.",
      },
      {
        question: "How does a Tuesday go?",
        hint: "The shape of a day with nothing in it but what they chose.",
        placeholder: "Garden, then the paper, then nothing at all.",
      },
      {
        question: "What did they always say they would get to?",
        hint: "The hobby, the room, the thing that waited for the free time.",
        placeholder: "The shed. They have been talking about the shed for years.",
      },
    ],
    dig: "the thing that waited years for the free time and still has not started",
  },
  "Something else": {
    cues: [
      {
        question: "What do they always wear?",
        hint: "A jacket they replace every year. The same boots. A ring they never take off.",
        placeholder: "The same grey wool coat, every day, from the start of October.",
      },
      {
        question: "What do they rewatch?",
        hint: "Not their favourite film. The one that is always on in the background.",
        placeholder: "The same cooking show, from the start, every winter.",
      },
      {
        question: "What would they never buy themselves?",
        hint: "Something they would pick up, smile at, and put back.",
        placeholder: "Anything that costs more than twenty dollars for the kitchen.",
      },
    ],
    dig: "the everyday moment where they wish something were different",
  },
};

const FALLBACK = SETS["Something else"];

/** Three authored cues, written for this chapter type. */
export const questionsFor = (type) => SETS[type] ?? FALLBACK;

/** The first thing the interview is told, so its follow ups stay on this chapter. */
export const interviewSeed = (form) => {
  const set = questionsFor(form.chapterType);
  return [
    `I am starting a chapter for ${form.personName || "a friend"}.`,
    `The chapter is ${form.chapterType || "not chosen yet"}.`,
    form.alwaysWears ? `What they always wear: ${form.alwaysWears}` : "",
    form.rewatches ? `What they rewatch: ${form.rewatches}` : "",
    form.neverBuys ? `What they would never buy themselves: ${form.neverBuys}` : "",
    `What I most want you to get at: ${set.dig}`,
    "Ask what you need, one question at a time, two follow up questions at most, then suggest the three things.",
  ]
    .filter(Boolean)
    .join("\n");
};