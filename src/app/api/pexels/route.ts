// Proxy serveur vers Pexels : la clé ne quitte jamais le serveur.
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim().slice(0, 100);
  const cle = process.env.PEXELS_API_KEY;
  if (!q || !cle) return Response.json({ url: null });

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: cle }, next: { revalidate: 86400 } },
    );
    if (!res.ok) return Response.json({ url: null });
    const data = (await res.json()) as { photos?: { src?: { large?: string } }[] };
    const url = data.photos?.[0]?.src?.large ?? null;
    return Response.json({ url });
  } catch {
    return Response.json({ url: null });
  }
}
