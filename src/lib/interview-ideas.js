const BLOCK = /```suggestions\s*([\s\S]*?)```/i;

const clean = (idea) =>
  idea && typeof idea.name === "string" && idea.name.trim()
    ? {
        name: idea.name.trim().slice(0, 120),
        what: (idea.what || "").toString().trim().slice(0, 200),
        why: (idea.why || "").toString().trim().slice(0, 400),
        band: (idea.band || "").toString().trim().slice(0, 60),
        find: (idea.find || "").toString().trim().slice(0, 80),
      }
    : null;

/**
 * The agent ends with one fenced block of ideas. Pull it out so the message can
 * show them as cards, and keep the prose around it. A block that will not parse
 * is just shown as text: nothing is lost.
 */
export function splitIdeas(content = "") {
  const match = content.match(BLOCK);
  if (!match) return { text: content, ideas: null };

  try {
    const parsed = JSON.parse(match[1].trim());
    const best = clean(parsed?.best);
    if (!best) return { text: content.replace(BLOCK, "").trim(), ideas: null };
    const others = (Array.isArray(parsed?.others) ? parsed.others : [])
      .map(clean)
      .filter(Boolean)
      .slice(0, 2);
    return { text: content.replace(BLOCK, "").trim(), ideas: { best, others } };
  } catch {
    return { text: content.replace(BLOCK, "").trim(), ideas: null };
  }
}