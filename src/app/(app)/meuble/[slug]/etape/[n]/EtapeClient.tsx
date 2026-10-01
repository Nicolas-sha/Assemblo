"use client";

/* eslint-disable @next/next/no-img-element */
import { Bouton } from "@/components/ui/Bouton";
import { useToast } from "@/components/ui/Toast";
import { NB_ETAPES, type Etape } from "@/data/guide";

function IllustrationVide({ n }: { n: number }) {
  return (
    <div role="img" aria-label={`Illustration de l’étape ${n}`} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-image text-texte-2">
      <span className="flex size-16 items-center justify-center rounded-full bg-texte text-sous-titre font-bold text-texte-inverse">{n}</span>
      <span className="text-legende font-medium">Illustration à venir</span>
    </div>
  );
}

export function EtapeClient({ slug, nomMeuble, etape }: { slug: string; nomMeuble: string; etape: Etape }) {
  const { afficherToast } = useToast();
  const derniere = etape.n === NB_ETAPES;
  const precedent = etape.n === 1 ? `/meuble/${slug}/verification` : `/meuble/${slug}/etape/${etape.n - 1}`;
  const suivant = derniere ? `/meuble/${slug}/fin` : `/meuble/${slug}/etape/${etape.n + 1}`;

  return (
    <div className="mx-auto w-full max-w-[1200px] pt-6 md:pt-7">
      <p className="text-corps font-semibold text-texte-2">
        Étape {etape.n} sur {NB_ETAPES} · {nomMeuble}
      </p>
      <div
        role="progressbar"
        aria-label="Progression du montage"
        aria-valuemin={1}
        aria-valuemax={NB_ETAPES}
        aria-valuenow={etape.n}
        className="mt-2 h-2 w-full overflow-hidden rounded bg-bordure"
      >
        <div className="h-full rounded bg-action transition-[width] duration-500 ease-out" style={{ width: `${(etape.n / NB_ETAPES) * 100}%` }} />
      </div>

      <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:gap-8">
        <div className="h-[260px] w-full overflow-hidden rounded-grand bg-carte md:h-[520px] md:min-w-0 md:flex-1">
          {etape.image ? (
            <img src={etape.image} alt={`Illustration de l’étape ${etape.n} : ${etape.titre}`} className="h-full w-full object-contain" />
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
              className="w-fit cursor-pointer rounded-petit text-corps font-semibold text-action transition-colors duration-150 hover:text-action-survol focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              J’ai un problème
            </button>
          </div>
          <div className="flex gap-3 pt-2">
            <Bouton type="Secondaire" href={precedent} className="w-[132px] shrink-0 md:w-auto">
              Précédent
            </Bouton>
            <Bouton type="Primaire" href={suivant} className="flex-1 whitespace-nowrap md:flex-none">
              {derniere ? "Terminer le montage" : "Étape suivante"}
            </Bouton>
          </div>
        </div>
      </div>
    </div>
  );
}
