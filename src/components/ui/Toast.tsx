"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icone, type NomIcone } from "./Icone";

export type TypeToast = "succes" | "erreur" | "info";

export type ToastProps = {
  type: TypeToast;
  message: string;
  className?: string;
};

const STYLES: Record<TypeToast, { bordure: string; icone: NomIcone }> = {
  succes: { bordure: "border-succes", icone: "coche-succes" },
  erreur: { bordure: "border-erreur", icone: "alerte" },
  info: { bordure: "border-info", icone: "info" },
};

/** Rendu visuel d'un toast (sans minuterie). */
export function Toast({ type, message, className = "" }: ToastProps) {
  const s = STYLES[type];
  return (
    <div
      role="status"
      className={`flex w-[342px] max-w-full items-center gap-3 rounded-moyen border-[1.5px] bg-carte px-4 py-3 shadow-elev-2 md:w-[420px] ${s.bordure} ${className}`}
    >
      <Icone nom={s.icone} taille={22} />
      <p className="text-corps font-semibold text-texte">{message}</p>
    </div>
  );
}

type Element = { id: number; type: TypeToast; message: string };
type ToastContexte = { afficherToast: (type: TypeToast, message: string) => void };

const Contexte = createContext<ToastContexte | null>(null);

export const DUREE_TOAST_MS = 3000;

function ToastAutoFermant({ element, onFermer }: { element: Element; onFermer: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onFermer(element.id), DUREE_TOAST_MS);
    return () => clearTimeout(t);
  }, [element.id, onFermer]);
  return <Toast type={element.type} message={element.message} className="animate-monter" />;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<Element[]>([]);
  const compteur = useRef(0);
  const afficherToast = useCallback((type: TypeToast, message: string) => {
    compteur.current += 1;
    const id = compteur.current;
    setFile((f) => [...f.slice(-2), { id, type, message }]);
  }, []);
  const fermer = useCallback((id: number) => setFile((f) => f.filter((e) => e.id !== id)), []);
  const valeur = useMemo(() => ({ afficherToast }), [afficherToast]);

  return (
    <Contexte.Provider value={valeur}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[100] flex flex-col items-center gap-2 px-4 md:bottom-10">
        {file.map((e) => (
          <div key={e.id} className="pointer-events-auto">
            <ToastAutoFermant element={e} onFermer={fermer} />
          </div>
        ))}
      </div>
    </Contexte.Provider>
  );
}

export function useToast(): ToastContexte {
  const v = useContext(Contexte);
  if (!v) throw new Error("useToast doit être utilisé dans <ToastProvider>");
  return v;
}
