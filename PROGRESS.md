# État — Assemblo · 2026-10-01 · branche feature/haute-fidelite

## 🟢 Fait
- Figma lu (quota MCP épuisé, plus aucun appel) : tokens, composants, 5 écrans desktop → design/ref/, design/SPEC.md
- Socle : tokens Tailwind, Inter, composants ui, données fictives, état localStorage, route /api/pexels, .env.example
- 10 pages codées desktop + mobile (un code, bascule à 768px) ; parcours complet testé dans Chrome
- lint + tsc propres ; 2 écarts mobile corrigés (titre d'étape, bouton « Terminer »)

## 🟡 En cours
- Rien d'actif. Aucun commit : 17 fichiers en attente sur feature/haute-fidelite.

## 🔴 Bloqué / pièges
- `npm run build` non vérifié : Google Fonts inaccessible depuis l'environnement Claude → à lancer chez toi
- Quota Figma Starter épuisé : écran Accueil + tous les mobiles jamais capturés (déduits). Ne pas retenter sans nouveau quota.
- Typo Inter non chargée dans mes tests (repli sur police système) → rendu typo à confirmer
- `rm -rf .next` supprime les types PageProps/LayoutProps → relancer `npx next typegen`
- Hypothèses non dessinées : « Il me manque une pièce » → toast erreur · « J'ai un problème » → toast info · « Passer » → accueil · page /montages · étapes 2-14 fictives (// TODO) · onglets mobile visibles sur Fin/Merci

## 👉 Prochaine étape
1. `npm run build` + coller PEXELS_API_KEY dans .env
2. Valider les hypothèses ci-dessus
3. Commits par sujet puis merge feature → dev
4. Quand le quota Figma revient : comparer Accueil + mobiles (≤ 6 appels)
