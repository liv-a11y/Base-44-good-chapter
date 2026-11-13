import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * The person's first say. Each answer has its own token, so an accept link can
 * never be used to decline and neither link can open anything else. Tokens are
 * replaced every time the chapter is sent, which kills the old letter.
 */
const ANSWERS = ["accept", "decline"];

const tokenField = (answer) => (answer === "accept" ? "accept_token" : "decline_token");

const byToken = async (service, token, answer) => {
  const page = await service.entities.Chapter.filter({ [tokenField(answer)]: token }, { limit: 1 });
  return (page.items ?? page)[0] ?? null;
};

const day = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

const tokenShape = z.string().trim().min(12).max(64);

/** What the decision page may show: who it is for, and whether it is still open. */
export const getDecision = createServerFn({ method: "GET" })
  .validator(z.object({ token: tokenShape, answer: z.enum(ANSWERS) }))
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const chapter = await byToken(service, data.token, data.answer);
    if (!chapter) return null;

    const decision = chapter.person_decision || "pending";
    return {
      answer: data.answer,
      decision,
      settled: decision !== "pending",
      decided_on: day(chapter.person_decided_at),
      person_first: (chapter.person_name || "").split(/\s+/)[0] || "there",
      starter_name: (chapter.starter_name || "the friend who started it").trim(),
      chapter_type: chapter.chapter_type || "A chapter",
    };
  });

/**
 * Record the person's answer once. A second click on the same link is safe and
 * tells them the same thing; a finished decision never reopens from an old
 * letter, only from a fresh one the curator sends.
 */
export const recordDecision = createServerFn({ method: "POST" })
  .validator(
    z.object({
      token: tokenShape,
      answer: z.enum(ANSWERS),
      reason: z.string().trim().max(600).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const service = context.getBase44().asServiceRole;

    const chapter = await byToken(service, data.token, data.answer);
    if (!chapter) return { ok: false };

    const decision = chapter.person_decision || "pending";
    if (decision !== "pending") {
      return {
        ok: true,
        decision,
        already: true,
        decided_on: day(chapter.person_decided_at),
        person_first: (chapter.person_name || "").split(/\s+/)[0] || "there",
        starter_name: (chapter.starter_name || "the friend who started it").trim(),
      };
    }

    const now = new Date().toISOString();
    const personFirst = (chapter.person_name || "").split(/\s+/)[0] || "there";
    const starter = (chapter.starter_name || "the friend who started it").trim();

    if (data.answer === "accept") {
      await service.entities.Chapter.update(chapter.id, {
        person_decision: "accepted",
        person_decided_at: now,
      });
      return { ok: true, decision: "accepted", decided_on: day(now), person_first: personFirst, starter_name: starter };
    }

    await service.entities.Chapter.update(chapter.id, {
      person_decision: "declined",
      person_decided_at: now,
      person_decline_reason: data.reason || "",
      state: "declined",
      state_changed_at: now,
    });
    return { ok: true, decision: "declined", decided_on: day(now), person_first: personFirst, starter_name: starter };
  });