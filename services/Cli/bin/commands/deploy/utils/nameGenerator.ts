import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";

export function generateUniqueName(): string {
  const readable = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    style: "lowerCase",
  });
  const random = Math.random().toString(36).slice(2, 8);
  return `${readable}-${random}`;
}
