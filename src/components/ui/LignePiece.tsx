import { Icone, type NomIcone } from "./Icone";

export type LignePieceProps = {
  nom: string;
  quantite: number;
  /** Nom du fichier de public/pieces (sans .svg). */
  pictogramme: NomIcone;
  verifiee: boolean;
  onBasculer: () => void;
  className?: string;
};

export function LignePiece({ nom, quantite, pictogramme, verifiee, onBasculer, className = "" }: LignePieceProps) {
  return (
    <button
      type="button"
      aria-pressed={verifiee}
      onClick={onBasculer}
      className={`flex min-h-[72px] w-full cursor-pointer items-center gap-3 rounded-moyen px-4 py-3 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action ${
        verifiee ? "border-[1.5px] border-action bg-action-teinte" : "border border-bordure bg-carte"
      } ${className}`}
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-petit bg-image">
        <Icone nom={pictogramme} taille={30} />
      </span>
      <span className="flex flex-1 flex-col">
        <span className="text-corps font-semibold text-texte">{nom}</span>
        <span className="text-legende font-medium text-texte-2">× {quantite}</span>
      </span>
      <span
        aria-hidden="true"
        className={`flex size-7 shrink-0 items-center justify-center rounded-petit border-2 transition-colors duration-150 ${
          verifiee ? "border-action bg-action" : "border-champ bg-carte"
        }`}
      >
        {verifiee ? <Icone nom="coche-blanche" taille={18} className="animate-pop" /> : null}
      </span>
    </button>
  );
}
