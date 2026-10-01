"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type Avis = { note: number; commentaire: string };

export type EtatApp = {
  connecte: boolean;
  /** slug du meuble → ids des pièces cochées */
  piecesCochees: Record<string, string[]>;
  /** slugs des meubles dont le montage est terminé */
  montagesTermines: string[];
  /** slug → avis laissé */
  avis: Record<string, Avis>;
};

const CLE = "assemblo-etat";
const ETAT_VIDE: EtatApp = { connecte: false, piecesCochees: {}, montagesTermines: [], avis: {} };

let cache: EtatApp | null = null;
const abonnes = new Set<() => void>();

function lire(): EtatApp {
  try {
    const brut = window.localStorage.getItem(CLE);
    if (!brut) return ETAT_VIDE;
    const p = JSON.parse(brut) as Partial<EtatApp>;
    return {
      connecte: p.connecte === true,
      piecesCochees: p.piecesCochees && typeof p.piecesCochees === "object" ? p.piecesCochees : {},
      montagesTermines: Array.isArray(p.montagesTermines) ? p.montagesTermines : [],
      avis: p.avis && typeof p.avis === "object" ? p.avis : {},
    };
  } catch {
    return ETAT_VIDE;
  }
}

function getSnapshot(): EtatApp {
  if (cache === null) cache = lire();
  return cache;
}
function getServerSnapshot(): EtatApp {
  return ETAT_VIDE;
}
function subscribe(cb: () => void): () => void {
  abonnes.add(cb);
  const surStorage = (e: StorageEvent) => {
    if (e.key === CLE) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", surStorage);
  return () => {
    abonnes.delete(cb);
    window.removeEventListener("storage", surStorage);
  };
}
function ecrire(suivant: EtatApp) {
  cache = suivant;
  try {
    window.localStorage.setItem(CLE, JSON.stringify(suivant));
  } catch {
    /* stockage indisponible : l'état reste en mémoire */
  }
  abonnes.forEach((cb) => cb());
}

const subscribeMonte = () => () => {};

type AppStateValeur = EtatApp & {
  /** false au rendu serveur / hydratation, true ensuite : à utiliser avant de rediriger vers /login */
  pret: boolean;
  setConnecte: (valeur: boolean) => void;
  basculerPiece: (slug: string, pieceId: string) => void;
  reinitialiserPieces: (slug: string) => void;
  terminerMontage: (slug: string) => void;
  enregistrerAvis: (slug: string, avis: Avis) => void;
};

const Contexte = createContext<AppStateValeur | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const etat = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const pret = useSyncExternalStore(subscribeMonte, () => true, () => false);

  const setConnecte = useCallback((connecte: boolean) => ecrire({ ...getSnapshot(), connecte }), []);
  const basculerPiece = useCallback((slug: string, pieceId: string) => {
    const e = getSnapshot();
    const actuelles = e.piecesCochees[slug] ?? [];
    const suivantes = actuelles.includes(pieceId) ? actuelles.filter((id) => id !== pieceId) : [...actuelles, pieceId];
    ecrire({ ...e, piecesCochees: { ...e.piecesCochees, [slug]: suivantes } });
  }, []);
  const reinitialiserPieces = useCallback((slug: string) => {
    const e = getSnapshot();
    ecrire({ ...e, piecesCochees: { ...e.piecesCochees, [slug]: [] } });
  }, []);
  const terminerMontage = useCallback((slug: string) => {
    const e = getSnapshot();
    if (e.montagesTermines.includes(slug)) return;
    ecrire({ ...e, montagesTermines: [...e.montagesTermines, slug] });
  }, []);
  const enregistrerAvis = useCallback((slug: string, avis: Avis) => {
    const e = getSnapshot();
    ecrire({ ...e, avis: { ...e.avis, [slug]: avis } });
  }, []);

  const valeur = useMemo<AppStateValeur>(
    () => ({ ...etat, pret, setConnecte, basculerPiece, reinitialiserPieces, terminerMontage, enregistrerAvis }),
    [etat, pret, setConnecte, basculerPiece, reinitialiserPieces, terminerMontage, enregistrerAvis],
  );
  return <Contexte.Provider value={valeur}>{children}</Contexte.Provider>;
}

export function useAppState(): AppStateValeur {
  const v = useContext(Contexte);
  if (!v) throw new Error("useAppState doit être utilisé dans <AppStateProvider>");
  return v;
}
