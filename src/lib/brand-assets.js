/**
 * The official marks, served from this app's own public folder. The wordmark ships in
 * burgundy and paper at the same canvas (1554 x 630, ratio 2.467:1); the clay
 * tag is set over its corner exactly as the site sets it. Never recoloured,
 * never squashed, never reset as live type.
 */

export const WORDMARK_INK = `/brand/wordmark-burgundy.png`;
export const WORDMARK_PAPER = `/brand/wordmark-paper.png`;
export const TAG_CLAY = `/brand/tag-clay.png`;

export const DRAWINGS = {
  door: `/brand/door-burgundy.png`,
  mugs: `/brand/mugs-burgundy.png`,
  toaster: `/brand/toaster-burgundy.png`,
  blanket: `/brand/blanket-burgundy.png`,
  gift: `/brand/gift-paper.png`,
};

/** Block-print chapter symbols, one burgundy and one paper file each. See public/brand/ICONS.md. */
const symbol = (slug) => ({
  ink: `/brand/icons/chapters/${slug}-burgundy.png`,
  paper: `/brand/icons/chapters/${slug}-paper.png`,
});

export const CHAPTER_SYMBOLS = {
  firstPlace: symbol("home"),
  movingIn: symbol("moving-in"),
  startingOver: symbol("divorce"),
  freshStart: symbol("fresh-start"),
  newWork: symbol("new-job"),
  newBabySolo: symbol("new-arrival"),
};

export const ARCHIVE = {
  interior: `/media/marshall-field-interior.jpg`,
  street: `/media/marshall-field-1906.jpg`,
};

export const APP_ICON_COBALT =
  "https://base44.app/api/apps/6af66f925ddaabe6b3b327a8/files/mp/public/6af66f925ddaabe6b3b327a8/a8260f86e_iconCobalt.png";