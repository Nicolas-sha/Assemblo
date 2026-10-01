export type Difficulte = "Facile" | "Moyenne" | "Difficile";

export type Meuble = {
  slug: string;
  nom: string;
  reference: string;
  /** Ex. « ≈ 1 h 30 » */
  duree: string;
  nbEtapes: number;
  difficulte: Difficulte;
  outils: string;
  piecesResume: string;
  requetePexels: string;
  /** Image locale de secours (chemin public) */
  image?: string;
};

// TODO refs/durées fictives sauf commode-3-tiroirs (000.000.10 / 1 h 30).
export const meubles: Meuble[] = [
  { slug: "commode-3-tiroirs", nom: "Commode 3 tiroirs", reference: "Réf. 000.000.10", duree: "≈ 1 h 30", nbEtapes: 15, difficulte: "Moyenne", outils: "tournevis cruciforme, marteau", piecesResume: "6 types de pièces, 58 éléments", requetePexels: "wooden chest of drawers", image: "/images/commode-3-tiroirs.png" },
  { slug: "commode-6-tiroirs", nom: "Commode 6 tiroirs", reference: "Réf. 000.000.11", duree: "≈ 2 h 30", nbEtapes: 22, difficulte: "Difficile", outils: "tournevis cruciforme, marteau", piecesResume: "6 types de pièces, 96 éléments", requetePexels: "large dresser bedroom" },
  { slug: "commode-basse", nom: "Commode basse", reference: "Réf. 000.000.12", duree: "≈ 1 h", nbEtapes: 11, difficulte: "Facile", outils: "tournevis cruciforme", piecesResume: "5 types de pièces, 40 éléments", requetePexels: "low sideboard wood" },
  { slug: "chiffonnier-5-tiroirs", nom: "Chiffonnier 5 tiroirs", reference: "Réf. 000.000.13", duree: "≈ 2 h", nbEtapes: 18, difficulte: "Moyenne", outils: "tournevis cruciforme, marteau", piecesResume: "6 types de pièces, 80 éléments", requetePexels: "tall chest of drawers" },
  { slug: "table-de-chevet", nom: "Table de chevet", reference: "Réf. 000.000.14", duree: "≈ 45 min", nbEtapes: 9, difficulte: "Facile", outils: "tournevis cruciforme", piecesResume: "4 types de pièces, 28 éléments", requetePexels: "bedside table wood" },
  { slug: "commode-d-angle", nom: "Commode d’angle", reference: "Réf. 000.000.15", duree: "≈ 3 h", nbEtapes: 26, difficulte: "Difficile", outils: "tournevis cruciforme, marteau, clé Allen", piecesResume: "7 types de pièces, 90 éléments", requetePexels: "corner dresser furniture" },
  { slug: "bureau-droit", nom: "Bureau droit", reference: "Réf. 000.000.01", duree: "≈ 50 min", nbEtapes: 8, difficulte: "Facile", outils: "tournevis cruciforme", piecesResume: "4 types de pièces, 30 éléments", requetePexels: "wooden desk" },
  { slug: "etagere-4-niveaux", nom: "Étagère 4 niveaux", reference: "Réf. 000.000.02", duree: "≈ 40 min", nbEtapes: 7, difficulte: "Facile", outils: "tournevis cruciforme", piecesResume: "3 types de pièces, 32 éléments", requetePexels: "wooden bookshelf" },
];

/** Cas limite « meuble sans guide » (/catalogue/sans-guide). */
export const meubleSansGuide = { slug: "sans-guide", nom: "La commode lingère", reference: "Réf. 000.000.99" } as const;

/** Les 6 meubles du catalogue (Chambre). */
export const meublesCatalogue: Meuble[] = meubles.slice(0, 6);

/** Accueil : « Récemment consultés ». */
export const meublesRecents: Meuble[] = [
  meubles[0],
  meubles.find((m) => m.slug === "bureau-droit")!,
  meubles.find((m) => m.slug === "etagere-4-niveaux")!,
];

export function getMeuble(slug: string): Meuble | undefined {
  return meubles.find((m) => m.slug === slug);
}
