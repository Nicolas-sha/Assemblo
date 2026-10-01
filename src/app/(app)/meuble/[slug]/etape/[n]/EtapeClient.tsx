"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bouton } from "@/components/ui/Bouton";
import { FurnitureImage } from "@/components/ui/FurnitureImage";
import { useToast } from "@/components/ui/Toast";
import { piecesVerification, type Etape } from "@/data/guide";
import { useAppState } from "@/lib/app-state";

function IllustrationVide({ n }: { n: number }) {
  return (
    <div role="img" aria-label={`Illustration de l’étape ${n}`} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-image text-texte-2">
      <span className="flex size-16 items-center justify-center rounded-full bg-texte text-sous-titre font-bold text-texte-inverse">{n}</span>
      <span className="text-legende font-medium">Illustration à venir</span>
    </div>
  );
}

export function EtapeClient({ slug, nomMeuble, etape, total }: { slug: string; nomMeuble: string; etape: Etape; total: number }) {
  const { afficherToast } = useToast();
  const router = useRouter();
  const { piecesCochees, pret } = useAppState();
  const cochees = piecesCochees[slug] ?? [];
  const toutCoche = piecesVerification.every((p) => cochees.includes(p.id));
  useEffect(() => {
    if (pret && !toutCoche) router.replace(`/meuble/${slug}/verification`);
  }, [pret, toutCoche, router, slug]);
  const derniere = etape.n === total;
  const precedent = etape.n === 1 ? `/meuble/${slug}/verification` : `/meuble/${slug}/etape/${etape.n - 1}`;
  const suivant = derniere ? `/meuble/${slug}/fin` : `/meuble/${slug}/etape/${etape.n + 1}`;

  if (!pret || !toutCoche) return null;

  return (
    <div className="mx-auto w-full max-w-[1200px] pt-6 md:pt-7">
      <p className="text-corps font-semibold text-texte-2">
        Étape {etape.n} sur {total} · {nomMeuble}
      </p>
      <div
        role="progressbar"
        aria-label="Progression du montage"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={etape.n}
        className="mt-2 h-2 w-full overflow-hidden rounded bg-bordure"
      >
        <div className="h-full rounded bg-action transition-[width] duration-500 ease-out" style={{ width: `${(etape.n / total) * 100}%` }} />
      </div>

      <nav aria-label="Aller à une étape" className="-mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
          const actuelle = n === etape.n;
          const faite = n < etape.n;
          return (
            <Link
              key={n}
              href={`/meuble/${slug}/etape/${n}`}
              aria-label={`Étape ${n}${faite ? " (faite)" : ""}`}
              aria-current={actuelle ? "step" : undefined}
              ref={actuelle ? (el) => { const c = el?.parentElement; if (el && c) c.scrollLeft = el.offsetLeft - c.clientWidth / 2 + el.offsetWidth / 2; } : undefined}
              className={`flex size-11 shrink-0 items-center justify-center rounded-moyen border-[1.5px] text-corps font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action ${
                actuelle
                  ? "border-action bg-action text-texte-inverse"
                  : faite
                    ? "border-action bg-action-teinte text-action hover:bg-carte"
                    : "border-bordure bg-carte text-texte-2 hover:border-action hover:text-action"
              }`}
            >
              {n}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:gap-8">
        <div className="h-[260px] w-full overflow-hidden rounded-grand bg-schema md:h-[520px] md:min-w-0 md:flex-1">
          {etape.image ? (
            <img src={etape.image} alt={`Illustration de l’étape ${etape.n} : ${etape.titre}`} className="h-full w-full object-contain" />
          ) : etape.requetePexels ? (
            <FurnitureImage requete={etape.requetePexels} alt={`Illustration de l’étape ${etape.n} : ${etape.titre}`} className="h-full w-full" />
          ) : (
            <IllustrationVide n={etape.n} />
          )}
        </div>

        <div className="flex w-full flex-col gap-4 md:min-h-[520px] md:w-[460px] md:shrink-0 md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-sous-titre font-bold text-texte md:text-titre">{etape.titre}</h1>
            <p className="text-corps text-texte-2">{etape.texte}</p>
            <p className="text-corps font-semibold text-texte-2">Pièces utilisées : {etape.pieces}</p>
            <button
              type="button"
              onClick={() => afficherToast("info", "Nous avons bien noté votre problème.")}
              className="min-h-11 w-fit cursor-pointer rounded-petit text-corps font-semibold text-action transition-colors duration-150 hover:text-action-survol focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              J’ai un problème
            </button>
          </div>
          <div className="flex gap-3 pt-2">
            <Bouton type="Secondaire" href={precedent} className="shrink-0 !px-4 md:!px-6">
              Précédent
            </Bouton>
            <Bouton type="Primaire" href={suivant} className="min-w-0 flex-1 !px-4 md:flex-none md:whitespace-nowrap md:!px-6">
              {derniere ? "Terminer le montage" : "Étape suivante"}
            </Bouton>
          </div>
        </div>
      </div>
    </div>
  );
}
