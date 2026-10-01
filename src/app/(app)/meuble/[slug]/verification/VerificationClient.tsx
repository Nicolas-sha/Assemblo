"use client";

import { Bouton } from "@/components/ui/Bouton";
import type { NomIcone } from "@/components/ui/Icone";
import { LignePiece } from "@/components/ui/LignePiece";
import { useToast } from "@/components/ui/Toast";
import { piecesVerification } from "@/data/guide";
import { useAppState } from "@/lib/app-state";

export function VerificationClient({ slug }: { slug: string }) {
  const { piecesCochees, basculerPiece } = useAppState();
  const { afficherToast } = useToast();
  const cochees = piecesCochees[slug] ?? [];

  return (
    <div className="mx-auto w-full max-w-[1200px] pt-6 md:pt-7">
      <Bouton type="Texte" href={`/meuble/${slug}`} className="-ml-6 !min-h-0 !px-6 !py-2 text-legende md:text-corps">
        ← Retour
      </Bouton>
      <h1 className="mt-2 text-titre font-bold text-texte">Vérifiez vos pièces</h1>
      <p className="mt-2 text-corps font-semibold text-action">Touchez chaque pièce pour la cocher.</p>

      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {piecesVerification.map((p) => (
          <li key={p.id}>
            <LignePiece
              nom={p.nom}
              quantite={p.quantite}
              pictogramme={p.pictogramme as NomIcone}
              verifiee={cochees.includes(p.id)}
              onBasculer={() => basculerPiece(slug, p.id)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col gap-3 md:mt-16 md:flex-row md:gap-3">
        <Bouton
          type="Secondaire"
          pleineLargeur
          className="md:w-auto"
          onClick={() => afficherToast("erreur", "Pièce manquante signalée : contactez le service client.")}
        >
          Il me manque une pièce
        </Bouton>
        <Bouton type="Primaire" pleineLargeur className="md:w-auto" href={`/meuble/${slug}/etape/1`}>
          Tout est là, je commence
        </Bouton>
      </div>
    </div>
  );
}
