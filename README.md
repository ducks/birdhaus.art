# Birdhaus

A single-page, poster-style landing page for **Birdhaus** - a (fake-serious)
modernist art movement of geometric avian studies. A lost Bauhaus exhibition
poster, EST. 2026.

Plain HTML / CSS / JS. No build step, no framework, no dependencies. Hosts
anywhere as static files.

## Structure

```
birdhaus.art/
  index.html              # all markup (semantic HTML, inline SVG favicon)
  static/
    css/styles.css        # palette (CSS variables), Bauhaus grid, motion
    js/script.js          # adds .is-loaded to trigger the entrance animation
    img/crow.png          # the faceted crow mark (transparent PNG)
  CNAME                    # custom domain for GitHub Pages (birdhaus.art)
  .nojekyll               # tell GitHub Pages to skip Jekyll processing
  README.md
```

## Run locally

It's static, so just open the file:

```
xdg-open index.html      # Linux
open index.html          # macOS
```

Or serve it (closer to production, avoids any file:// quirks):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages, custom domain birdhaus.art)

1. **Push** this repo to GitHub.
2. **Settings -> Pages**: set Source to "Deploy from a branch", branch `main`,
   folder `/ (root)`.
3. **Custom domain**: enter `birdhaus.art`. The `CNAME` file already pins it
   (GitHub keeps the two in sync).
4. **DNS** at your registrar - point the apex domain at GitHub Pages with four
   A records (and the IPv6 AAAA records):

   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   AAAA  @   2606:50c0:8000::153
   AAAA  @   2606:50c0:8001::153
   AAAA  @   2606:50c0:8002::153
   AAAA  @   2606:50c0:8003::153
   ```

   If you also want `www.birdhaus.art`, add:

   ```
   CNAME www <your-github-username>.github.io
   ```

5. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings -> Pages.

> Verify GitHub's current Pages IPs before relying on the list above - they
> change rarely but are the source of truth:
> https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

## Editing notes

- **Palette**: the six colors live in `:root` in `static/css/styles.css`
  (`--cream`, `--black`, `--charcoal`, `--gray`, `--taupe`, `--red`, `--blue`).
  Change the whole look from there.
- **Type**: a fake-condensed system-font stack (no web fonts loaded). The
  `--font-display` comment in the CSS shows where to add a real font later
  (e.g. Archivo or Oswald) with the system stack kept as fallback.
- **The crow**: currently `static/img/crow.png` (one external asset). To go
  back to a pure inline SVG, replace the `<img class="bird__img">` in
  `index.html` with your `<svg>`; give shapes `class="plane"` +
  `style="--i:N"` to re-enable the staggered entrance animation.
- **Motion**: entrance animations are CSS transitions gated by an `.is-loaded`
  class that `script.js` adds after load. `prefers-reduced-motion` is fully
  respected (JS skips the animation; CSS has a hard visible fallback).
- **Favicon**: an inline SVG data URI in the `<head>` (red circle + black bar).
