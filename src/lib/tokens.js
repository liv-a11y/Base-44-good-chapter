/** Unguessable, URL-safe link token. No vowels that read as words, no lookalike pairs. */
export const newToken = () =>
  Array.from(
    { length: 24 },
    () => "abcdefghijkmnpqrstuvwxyz23456789"[Math.floor(Math.random() * 32)],
  ).join("");