export type Piece = {
  id: string;
  nom: string;
  quantite: number;
  /** Nom du fichier dans public/pieces (sans .svg) */
  pictogramme: string;
};

export type Etape = {
  n: number;
  titre: string;
  texte: string;
  /** Texte affiché après « Pièces utilisées : » */
  pieces: string;
  image?: string;
};

/** Pièces de la vérification (écran « Vérifiez vos pièces »). */
export const piecesVerification: Piece[] = [
  { id: "panneau-lateral", nom: "Panneau latéral", quantite: 2, pictogramme: "panneau-lateral" },
  { id: "plateau", nom: "Plateau", quantite: 1, pictogramme: "plateau" },
  { id: "facade-de-tiroir", nom: "Façade de tiroir", quantite: 3, pictogramme: "facade-de-tiroir" },
  { id: "vis-8-mm", nom: "Vis 8 mm", quantite: 24, pictogramme: "vis" },
  { id: "cheville-en-bois", nom: "Cheville en bois", quantite: 12, pictogramme: "cheville-en-bois" },
  { id: "coulisse-de-tiroir", nom: "Coulisse de tiroir", quantite: 6, pictogramme: "coulisse-de-tiroir" },
];

// TODO contenu à valider : étapes 2 à 14 fictives (1 et 15 viennent du Figma).
export const etapes: Etape[] = [
  {
    n: 1,
    titre: "Posez le plateau à l’envers sur le carton",
    texte:
      "Placez le plateau face contre le carton, trous vers le haut. Le carton protège la surface pendant tout le montage.",
    pieces: "plateau × 1",
    image: "/images/etape-1.png",
  },
  { n: 2, titre: "Insérez les chevilles dans le plateau", texte: "Enfoncez 6 chevilles en bois dans les trous du plateau, sans forcer.", pieces: "cheville en bois × 6" },
  { n: 3, titre: "Fixez le premier panneau latéral", texte: "Emboîtez le panneau latéral gauche sur les chevilles, puis serrez 4 vis de 8 mm.", pieces: "panneau latéral × 1, vis 8 mm × 4" },
  { n: 4, titre: "Fixez le second panneau latéral", texte: "Faites la même chose du côté droit. Vérifiez que les deux panneaux sont bien parallèles.", pieces: "panneau latéral × 1, vis 8 mm × 4" },
  { n: 5, titre: "Assemblez les coulisses côté gauche", texte: "Vissez les trois coulisses de tiroir sur la face intérieure du panneau gauche.", pieces: "coulisse de tiroir × 3, vis 8 mm × 6" },
  { n: 6, titre: "Assemblez les coulisses côté droit", texte: "Vissez les trois coulisses restantes en face, à la même hauteur que celles de gauche.", pieces: "coulisse de tiroir × 3, vis 8 mm × 6" },
  { n: 7, titre: "Montez le fond du meuble", texte: "Glissez le fond dans la rainure arrière, puis fixez-le avec quelques vis.", pieces: "vis 8 mm × 4" },
  { n: 8, titre: "Retournez le meuble", texte: "À deux si possible, redressez doucement le meuble sur ses pieds.", pieces: "aucune" },
  { n: 9, titre: "Préparez le premier tiroir", texte: "Assemblez les quatre côtés du tiroir avec des chevilles en bois.", pieces: "cheville en bois × 4" },
  { n: 10, titre: "Fixez la façade du premier tiroir", texte: "Vissez la façade sur le tiroir en vérifiant l’alignement.", pieces: "façade de tiroir × 1, vis 8 mm × 2" },
  { n: 11, titre: "Préparez le deuxième tiroir", texte: "Répétez l’assemblage des côtés avec les chevilles en bois.", pieces: "cheville en bois × 4" },
  { n: 12, titre: "Fixez la façade du deuxième tiroir", texte: "Vissez la façade du deuxième tiroir, en laissant un jeu régulier.", pieces: "façade de tiroir × 1, vis 8 mm × 2" },
  { n: 13, titre: "Préparez le troisième tiroir", texte: "Assemblez le dernier tiroir et fixez sa façade.", pieces: "façade de tiroir × 1, cheville en bois × 4, vis 8 mm × 2" },
  { n: 14, titre: "Glissez les tiroirs dans les coulisses", texte: "Engagez chaque tiroir sur ses coulisses jusqu’au clic.", pieces: "aucune" },
  { n: 15, titre: "Fixez les poignées des tiroirs", texte: "Vissez une poignée au centre de chaque façade avec 2 vis de 4 mm. Serrez à la main, sans forcer.", pieces: "poignées × 3, vis 4 mm × 6" },
];

export const NB_ETAPES = etapes.length;

export function getEtape(n: number): Etape | undefined {
  return etapes.find((e) => e.n === n);
}
