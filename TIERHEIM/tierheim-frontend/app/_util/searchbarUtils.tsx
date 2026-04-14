export const normalize = (s?: string | null): string =>
  (s ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export const normalizeQuery = (query?: string | null): string =>
  normalize((query ?? "").trim());

export const includesNormalized = (
  text?: string | null,
  normalizedQuery?: string,
): boolean => {
  const q = normalizedQuery ?? "";
  if (!q) return false;
  return normalize(text).includes(q);
};

export const matchByName = (
  name?: string | null,
  query?: string | null,
): boolean => includesNormalized(name, normalizeQuery(query));

export const buildNameMatcher = (query?: string | null) => {
  const q = normalizeQuery(query);
  return (name?: string | null) => includesNormalized(name, q);
};
