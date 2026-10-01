"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { BarreNavigationDesktop } from "@/components/ui/BarreNavigationDesktop";
import { BarreOngletsMobile } from "@/components/ui/BarreOngletsMobile";
import { useAppState } from "@/lib/app-state";

// Coque des pages connectées : barre desktop, onglets mobile, redirection vers /login si non connecté.
export function AppShell({ children }: { children: ReactNode }) {
  const { connecte, pret } = useAppState();
  const router = useRouter();

  useEffect(() => {
    if (pret && !connecte) router.replace("/login");
  }, [pret, connecte, router]);

  if (!pret || !connecte) return null;

  return (
    <>
      <BarreNavigationDesktop />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 pb-28 md:px-12 md:pb-12 lg:px-[120px]">
        {children}
      </main>
      <BarreOngletsMobile />
    </>
  );
}
