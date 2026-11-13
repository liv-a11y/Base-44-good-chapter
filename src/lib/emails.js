/**
 * The three letters Good Chapter sends. Plain, text-forward, no exclamation
 * points and no images beyond the type-set lockup. Each builder returns
 * { subject, text, html } so the caller can send both a text and an html part.
 */

const LOCKUP = "Good Chapter Co.";
const TAGLINE = "for what comes next.";

const firstName = (value, fallback) => {
  const name = (value || "").trim();
  return name ? name.split(/\s+/)[0] : fallback;
};

const escape = (value) =>
  (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const wrap = (paragraphs, signoff, actions = "") => {
  const body = paragraphs
    .map((paragraph) =>
      paragraph === ""
        ? `<div style="height:14px;line-height:14px">&nbsp;</div>`
        : `<p style="margin:0 0 16px;font-family:'EB Garamond',Garamond,Georgia,serif;font-size:19px;line-height:1.4;color:#651C1A">${escape(
            paragraph,
          ).replace(/\n/g, "<br />")}</p>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:28px 20px;background:#F8EBDA">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;border-collapse:collapse;background:#F1DDC0;border:1.5px solid #651C1A">
<tr><td style="padding:26px 28px 20px;border-bottom:1.5px solid #651C1A">
<span style="font-family:'Fraunces',Georgia,serif;font-size:20px;letter-spacing:-0.01em;color:#651C1A">${LOCKUP}</span>
</td></tr>
<tr><td style="padding:28px 28px 8px">${body}${actions}</td></tr>
<tr><td style="padding:0 28px 26px">
<p style="margin:0;font-family:'EB Garamond',Garamond,Georgia,serif;font-size:13px;letter-spacing:0.24em;text-transform:uppercase;color:#651C1A">${escape(
    signoff || TAGLINE,
  )}</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
};

const join = (lines) => lines.join("\n");

/** The two answers, as buttons in the letter. One cobalt, one drawn in ink. */
const decisionButtons = (acceptLink, declineLink, starter) => `<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;margin:6px 0 22px">
<tr><td style="background:#284CD6;border-radius:4px"><a href="${acceptLink}" style="display:inline-block;padding:15px 26px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.04em;color:#F8EBDA;text-decoration:none">Accept this chapter</a></td></tr>
<tr><td style="height:10px;line-height:10px">&nbsp;</td></tr>
<tr><td style="border:1.5px solid #651C1A;border-radius:4px"><a href="${declineLink}" style="display:inline-block;padding:14px 26px;font-family:'DM Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.04em;color:#651C1A;text-decoration:none">Send it back to ${escape(
  starter,
)}</a></td></tr>
</table>`;

/** 1. The private link, sent to the person when the chapter is ready for them. */
export const personLinkEmail = ({ chapter, link, acceptLink, declineLink }) => {
  const person = firstName(chapter?.person_name, "there");
  const starter = (chapter?.starter_name || "").trim();
  const opener = starter
    ? `${starter} started a chapter for you.`
    : "A chapter has been started for you.";

  const text = join([
    `${person},`,
    "",
    opener,
    "",
    "It is not a registry. There is nothing to browse and nothing picked from a catalogue. Eight things, chosen one at a time, with the reason written next to each one.",
    "",
    "You see it before anyone else does. Nothing reaches the people you named until you have answered.",
    "",
    "Two buttons, one answer:",
    `Accept it: ${acceptLink}`,
    `Send it back: ${declineLink}`,
    "",
    "If you would rather read the list first, it is here:",
    link,
    "",
    "Keep it to yourself. It is the only copy.",
    "",
    "From Good Chapter",
    TAGLINE,
  ]);

  return {
    subject: `${person}, a chapter with your name on it`,
    text,
    html: wrap(
      [
        `${person},`,
        opener,
        "It is not a registry. There is nothing to browse and nothing picked from a catalogue. Eight things, chosen one at a time, with the reason written next to each one.",
        "You see it before anyone else does. Nothing reaches the people you named until you have answered.",
      ],
      TAGLINE,
      `${decisionButtons(acceptLink, declineLink, starter || "them")}<p style="margin:0 0 16px;font-family:'EB Garamond',Garamond,Georgia,serif;font-size:19px;line-height:1.4;color:#651C1A">If you would rather read the list first, it is here: <a href="${link}" style="color:#651C1A">${link}</a></p><p style="margin:0 0 16px;font-family:'EB Garamond',Garamond,Georgia,serif;font-size:19px;line-height:1.4;color:#651C1A">Keep it to yourself. It is the only copy.</p>`,
    ),
  };
};

/** 2. The guest invitation. Always signed by the starter, never by the person. */
export const guestInvitationEmail = ({ chapter, guestName, link }) => {
  const person = firstName(chapter?.person_name, "someone");
  const starter = (chapter?.starter_name || "A friend").trim();
  const guest = firstName(guestName, "hello");

  const text = join([
    `Hello ${guest},`,
    "",
    `I am ${starter}. I started a chapter for ${person}.`,
    "",
    "Eight things, chosen one by one, each with a reason written next to it. Nothing was bought from a list. Nothing is a request for money.",
    "",
    `${person} read it before anyone else and said yes to it. That was the condition for this letter existing at all.`,
    "",
    "Pick the one thing on it you would most like to give. Once it is taken it comes off the list, so nobody doubles up.",
    "",
    "Your name goes next to it, or nothing at all if you would rather give it quietly.",
    "",
    link,
    "",
    "If none of it is right for you, leave it. Someone else will take it and nobody will know.",
    "",
    `— ${starter}`,
    "",
    "Sent through Good Chapter",
    TAGLINE,
  ]);

  return {
    subject: `${person}'s chapter`,
    text,
    html: wrap(
      [
        `Hello ${guest},`,
        `I am ${starter}. I started a chapter for ${person}.`,
        "Eight things, chosen one by one, each with a reason written next to it. Nothing was bought from a list. Nothing is a request for money.",
        `${person} read it before anyone else and said yes to it. That was the condition for this letter existing at all.`,
        "Pick the one thing on it you would most like to give. Once it is taken it comes off the list, so nobody doubles up.",
        "Your name goes next to it, or nothing at all if you would rather give it quietly.",
        link,
        "If none of it is right for you, leave it. Someone else will take it and nobody will know.",
      ],
      `— ${starter}`,
    ),
  };
};

/** 3. The single reminder. Sent once, to guests who have not taken anything yet. */
export const singleReminderEmail = ({ chapter, guestName, link }) => {
  const person = firstName(chapter?.person_name, "they");
  const starter = (chapter?.starter_name || "A friend").trim();
  const guest = firstName(guestName, "hello");

  const text = join([
    `Hello ${guest},`,
    "",
    `One reminder about ${person}'s chapter, and then no more from me.`,
    "",
    "Some of the eight are still open. If one of them suits you, take it. If none of them do, that is a fine answer and you do not owe a reply.",
    "",
    link,
    "",
    `— ${starter}`,
    "",
    "Sent through Good Chapter",
    TAGLINE,
  ]);

  return {
    subject: `One reminder: ${person}'s chapter`,
    text,
    html: wrap(
      [
        `Hello ${guest},`,
        `One reminder about ${person}'s chapter, and then no more from me.`,
        "Some of the eight are still open. If one of them suits you, take it. If none of them do, that is a fine answer and you do not owe a reply.",
        link,
      ],
      `— ${starter}`,
    ),
  };
};