"use client";

import { Bouton } from "@/components/ui/Bouton";
import { CarteMeuble } from "@/components/ui/CarteMeuble";
import { getMeuble, type Meuble } from "@/data/meubles";
import { useAppState } from "@/lib/app-state";

export function MontagesClient() {
  const { montagesTermines } = useAppState();
  const termines = montagesTermines.map(getMeuble).filter((m): m is Meuble => m !== undefined);

  return (
    <div className="mx-auto w-full max-w-[1200px] pt-6 md:pt-7">
      <h1 className="text-titre font-bold text-texte">Mes montages terminés</h1>
      {termines.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-grand border border-bordure bg-carte px-6 py-12 text-center">
          <p className="text-corps text-texte-2">Aucun montage terminé pour le moment. Votre premier meuble apparaîtra ici.</p>
          <Bouton type="Primaire" href="/catalogue">
            Choisir un meuble
          </Bouton>
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {termines.map((m) => (
            <li key={m.slug}>
              <CarteMeuble meuble={m} href={`/meuble/${m.slug}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
