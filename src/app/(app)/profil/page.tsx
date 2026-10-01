import type { Metadata } from "next";
import { ProfilClient } from "./ProfilClient";

export const metadata: Metadata = { title: "Profil · Assemblo" };

export default function Page() {
  return <ProfilClient />;
}
