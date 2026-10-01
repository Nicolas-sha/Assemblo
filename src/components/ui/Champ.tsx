import { useId, type ComponentProps } from "react";

export type ChampProps = Omit<ComponentProps<"input">, "id"> & {
  etiquette: string;
  id?: string;
  /** Message d'erreur affiché sous le champ. */
  erreur?: string;
};

export function Champ({ etiquette, id, erreur, className = "", ...reste }: ChampProps) {
  const auto = useId();
  const champId = id ?? auto;
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={champId} className="text-corps font-semibold text-texte">
        {etiquette}
      </label>
      <input
        id={champId}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={erreur ? `${champId}-erreur` : undefined}
        className={`min-h-12 w-full rounded-moyen border bg-carte px-4 py-3 text-corps text-texte placeholder:text-texte-2 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-action ${erreur ? "border-erreur" : "border-champ"}`}
        {...reste}
      />
      {erreur ? (
        <p id={`${champId}-erreur`} className="text-legende font-medium text-erreur">
          {erreur}
        </p>
      ) : null}
    </div>
  );
}
