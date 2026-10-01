import type { Metadata } from "next";
import { MontagesClient } from "./MontagesClient";

export const metadata: Metadata = { title: "Mes montages · Assemblo" };

export default function Page() {
  return <MontagesClient />;
}
