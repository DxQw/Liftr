# Liftr

A daily gym tracker, in the spirit of Liftoff — log sets and reps, run routines, time your rest, and watch your lifts progress. Built as a single-page web app (plain HTML/CSS/JS, no build step, no dependencies).

## Running it

Just open `index.html` in a browser. That's it.

To install it as an app on your phone (installable icon, opens full-screen, works offline), it needs to be served over `http(s)` rather than opened as a local file — service workers require a secure context. The easiest way is **GitHub Pages**:

1. Push this repo to GitHub (see below).
2. In the repo, go to **Settings → Pages**, set the source to your default branch (`/root`), and save.
3. Visit the `https://<your-username>.github.io/liftr/` URL it gives you, on your Android phone, in Chrome.
4. Tap the menu (⋮) → **Install app** (or **Add to Home screen**). It'll show up with its own icon and open like a native app.

## Data storage

- If opened inside Claude (as a published artifact), it syncs your workouts to your Claude account automatically.
- Anywhere else — GitHub Pages, opened locally, installed as a PWA — it saves to that browser's local storage instead. There's a status line in Settings that tells you which mode is active.
- Either way, **Settings → Export backup** gives you a `.json` file you can move between devices or keep as a backup (Settings → Import backup brings it back in).

## Project structure

| File | Purpose |
|---|---|
| `index.html` | The entire app — markup, styles, and logic. |
| `manifest.json` | PWA manifest (name, icons, theme color) so it can be installed. |
| `sw.js` | Service worker — caches the app shell for offline use once installed. |
| `icon-*.png` | App icons at the sizes the manifest references. |

## Pushing to GitHub

```bash
git remote add origin https://github.com/<your-username>/liftr.git
git branch -M main
git push -u origin main
```

(Create the empty `liftr` repository on GitHub first, without a README, so there's nothing to conflict with.)
