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
  /** Recherche Pexels pour l'illustration quand `image` est absente. */
  requetePexels?: string;
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
  { n: 2, titre: "Insérez les chevilles dans le plateau", texte: "Enfoncez 6 chevilles en bois dans les trous du plateau, sans forcer.", pieces: "cheville en bois × 6", image: "/images/etapes/commode-3-tiroirs/2.png" },
  { n: 3, titre: "Fixez le premier panneau latéral", texte: "Emboîtez le panneau latéral gauche sur les chevilles, puis serrez 4 vis de 8 mm.", pieces: "panneau latéral × 1, vis 8 mm × 4", image: "/images/etapes/commode-3-tiroirs/3.png" },
  { n: 4, titre: "Fixez le second panneau latéral", texte: "Faites la même chose du côté droit. Vérifiez que les deux panneaux sont bien parallèles.", pieces: "panneau latéral × 1, vis 8 mm × 4", image: "/images/etapes/commode-3-tiroirs/4.png" },
  { n: 5, titre: "Assemblez les coulisses côté gauche", texte: "Vissez les trois coulisses de tiroir sur la face intérieure du panneau gauche.", pieces: "coulisse de tiroir × 3, vis 8 mm × 6", image: "/images/etapes/commode-3-tiroirs/5.png" },
  { n: 6, titre: "Assemblez les coulisses côté droit", texte: "Vissez les trois coulisses restantes en face, à la même hauteur que celles de gauche.", pieces: "coulisse de tiroir × 3, vis 8 mm × 6", image: "/images/etapes/commode-3-tiroirs/6.png" },
  { n: 7, titre: "Montez le fond du meuble", texte: "Glissez le fond dans la rainure arrière, puis fixez-le avec quelques vis.", pieces: "vis 8 mm × 4", image: "/images/etapes/commode-3-tiroirs/7.png" },
  { n: 8, titre: "Retournez le meuble", texte: "À deux si possible, redressez doucement le meuble sur ses pieds.", pieces: "aucune", image: "/images/etapes/commode-3-tiroirs/8.png" },
  { n: 9, titre: "Préparez le premier tiroir", texte: "Assemblez les quatre côtés du tiroir avec des chevilles en bois.", pieces: "cheville en bois × 4", image: "/images/etapes/commode-3-tiroirs/9.png" },
  { n: 10, titre: "Fixez la façade du premier tiroir", texte: "Vissez la façade sur le tiroir en vérifiant l’alignement.", pieces: "façade de tiroir × 1, vis 8 mm × 2", image: "/images/etapes/commode-3-tiroirs/10.png" },
  { n: 11, titre: "Préparez le deuxième tiroir", texte: "Répétez l’assemblage des côtés avec les chevilles en bois.", pieces: "cheville en bois × 4", image: "/images/etapes/commode-3-tiroirs/11.png" },
  { n: 12, titre: "Fixez la façade du deuxième tiroir", texte: "Vissez la façade du deuxième tiroir, en laissant un jeu régulier.", pieces: "façade de tiroir × 1, vis 8 mm × 2", image: "/images/etapes/commode-3-tiroirs/12.png" },
  { n: 13, titre: "Préparez le troisième tiroir", texte: "Assemblez le dernier tiroir et fixez sa façade.", pieces: "façade de tiroir × 1, cheville en bois × 4, vis 8 mm × 2", image: "/images/etapes/commode-3-tiroirs/13.png" },
  { n: 14, titre: "Glissez les tiroirs dans les coulisses", texte: "Engagez chaque tiroir sur ses coulisses jusqu’au clic.", pieces: "aucune", image: "/images/etapes/commode-3-tiroirs/14.png" },
  { n: 15, titre: "Fixez les poignées des tiroirs", texte: "Vissez une poignée au centre de chaque façade avec 2 vis de 4 mm. Serrez à la main, sans forcer.", pieces: "poignées × 3, vis 4 mm × 6", image: "/images/etapes/commode-3-tiroirs/15.png" },
];

const bureauDroit: Etape[] = [
  { n: 1, titre: "Posez le plateau à l’envers sur le carton", texte: "Placez le plateau face contre le carton pour protéger la surface.", pieces: "plateau × 1", image: "/images/etapes/bureau-droit/1.png" },
  { n: 2, titre: "Fixez le pied gauche", texte: "Emboîtez le pied gauche sur le plateau et serrez les vis.", pieces: "pied × 1, vis × 4", image: "/images/etapes/bureau-droit/2.png" },
  { n: 3, titre: "Fixez le pied droit", texte: "Faites de même du côté droit, à la même distance du bord.", pieces: "pied × 1, vis × 4", image: "/images/etapes/bureau-droit/3.png" },
  { n: 4, titre: "Fixez la traverse arrière", texte: "Vissez la traverse entre les deux pieds, côté arrière.", pieces: "traverse × 1, vis × 4", image: "/images/etapes/bureau-droit/4.png" },
  { n: 5, titre: "Fixez les barres d’entretoise", texte: "Fixez les barres entre les pieds pour rigidifier la structure.", pieces: "barre × 2, vis × 8", image: "/images/etapes/bureau-droit/5.png" },
  { n: 6, titre: "Retournez le bureau à deux", texte: "À deux, redressez doucement le bureau sur ses pieds.", pieces: "aucune", image: "/images/etapes/bureau-droit/6.png" },
  { n: 7, titre: "Posez l’étagère basse", texte: "Glissez l’étagère sur les supports prévus entre les pieds.", pieces: "étagère × 1, vis × 4", image: "/images/etapes/bureau-droit/7.png" },
  { n: 8, titre: "Serrez toutes les vis et vérifiez la stabilité", texte: "Resserrez chaque vis et vérifiez que le bureau ne bouge pas.", pieces: "aucune", image: "/images/etapes/bureau-droit/8.png" },
];

const etagere4Niveaux: Etape[] = [
  { n: 1, titre: "Posez le côté gauche à plat", texte: "Posez le côté gauche à plat, face intérieure vers le haut.", pieces: "côté × 1", image: "/images/etapes/etagere-4-niveaux/1.png" },
  { n: 2, titre: "Insérez les chevilles dans les côtés", texte: "Enfoncez les chevilles en bois dans les trous des côtés.", pieces: "cheville en bois × 8", image: "/images/etapes/etagere-4-niveaux/2.png" },
  { n: 3, titre: "Fixez l’étagère du bas", texte: "Emboîtez l’étagère du bas sur les chevilles et vissez.", pieces: "étagère × 1, vis × 4", image: "/images/etapes/etagere-4-niveaux/3.png" },
  { n: 4, titre: "Fixez les deuxième et troisième étagères", texte: "Fixez les deux étagères intermédiaires à intervalles réguliers.", pieces: "étagère × 2, vis × 8", image: "/images/etapes/etagere-4-niveaux/4.png" },
  { n: 5, titre: "Fixez le côté droit", texte: "Emboîtez le côté droit sur les étagères et vissez.", pieces: "côté × 1, vis × 6", image: "/images/etapes/etagere-4-niveaux/5.png" },
  { n: 6, titre: "Fixez l’étagère du haut", texte: "Posez l’étagère du haut et fixez-la sur les deux côtés.", pieces: "étagère × 1, vis × 4", image: "/images/etapes/etagere-4-niveaux/6.png" },
  { n: 7, titre: "Fixez le fond arrière et vérifiez la stabilité", texte: "Clouez le fond arrière puis vérifiez que l’étagère est stable.", pieces: "fond × 1, clous × 20", image: "/images/etapes/etagere-4-niveaux/7.png" },
];

/** Guides illustrés par meuble. Les autres meubles réutilisent le guide de la commode (démo). */
const guidesParMeuble: Record<string, Etape[]> = {
  "bureau-droit": bureauDroit,
  "etagere-4-niveaux": etagere4Niveaux,
};

export function getEtapes(slug: string): Etape[] {
  return guidesParMeuble[slug] ?? etapes;
}

export function getEtape(slug: string, n: number): Etape | undefined {
  return getEtapes(slug).find((e) => e.n === n);
}
