export const CATEGORIES = [
  "Todos",
  "Escritura",
  "Desarrollo",
  "Marketing",
  "Estrategia",
  "Comunicación",
] as const;

export type Category = (typeof CATEGORIES)[number];
