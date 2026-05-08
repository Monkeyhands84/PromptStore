export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function randomSlugSuffix(len = 4): string {
  return Math.random().toString(36).slice(2, 2 + len);
}

export function buildSlugCandidate(title: string, attempt: number): string {
  const base = slugify(title) || "prompt";
  return attempt === 0 ? base : `${base}-${randomSlugSuffix()}`;
}
