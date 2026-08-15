# Roadmap

This file tracks deferred content, copy-writing, and pre-launch technical work for [this website](https://www.keitaay.com).

## Content backlog

A number of content items are deliberately deferred. The following content/asset work needs to be done with a significant amount of manual/creative effort or external input:

- **Case studies are hidden until they're actually ready, not just written.** All 6 files in `src/cases/*.md` are marked `doIgnore: true` (hides them from every listing - homepage, `/cases`, tag pages, "related cases") because none currently have real content, and it's not just an unwritten-body-copy problem:
  - Every case's `brief:` front matter field is still the literal placeholder `"Text blah blah blah."`, which renders directly as visible page copy via `_layouts/case.html` - a shipped bug if any of these were ever unhidden as-is, not just an empty Markdown body.
  - `imageHero:` for 4 of the 6 is the neutral placeholder SVG (`cases/img/placeholder-hero.svg`), which also feeds that page's `og:image` - a shared link preview for one of these would currently show the placeholder, not a real photo.
  - Every case-study `<img>` has `alt=""`. Currently harmless since the placeholder SVG carries no information and the visible caption text duplicates whatever a real image would show - but real photography (see below) will carry information a plain-text caption doesn't fully substitute for. Revisit alt text at the same time real images go in, not as a separate pass.
  - Write the flagship case first - `dopio_development.md` or `transplant_visr.md` are the best-fitted candidates - including a real `brief`, then flip its `doIgnore` to `false`. Don't unhide the rest until each is individually ready; a single strong case beats several thin ones.
  - **Known limitation:** `doIgnore` only removes a case from listings (via the custom `exclude` filter used throughout the templates); 11ty still builds and publishes the individual page at its direct URL regardless. A hidden case is hard to stumble onto, but not truly unpublished - a direct link or search-engine crawl could still reach it. A complete "draft" mechanism (e.g. a computed `permalink: false` via `eleventyComputed`) would prevent the page from building at all, but that's untested here and worth doing deliberately later, not as a quick add-on now.
  - **`gbcc.md`'s `imageHero` points at a nonexistent file** (`cg2.jpg`, never present in `cases/img/`) - harmless today only because the page is unreachable through any listing, per the "Known limitation" above. The case-study image-optimization pipeline (`eleventyImageTransformPlugin` in `.eleventy.js`) is configured with `failOnError: false` specifically to tolerate this without hard-failing the build - but that tolerance changes the failure mode, not just preserves it: the hero `<img>`'s `src` now gets rewritten to a nonsensical relative path (`src/cases/img/cg2.jpg`) instead of the previous root-relative 404 (`/cases/img/cg2.jpg`). Both are broken either way; fix the frontmatter path if/when `gbcc.md` is ever written up for real, not before.
- **A real headshot photo.** None exists yet for the "Who is Kéita?" section (`index.html`).
- **`job-search-help.html`'s "Why Work With Me" section** still has placeholder credibility copy (marked with an HTML comment in the file) - needs my actual relevant experience before this page is really ready to publish.

Additional tasks depend on decisions to be made outside the site itself:

- **`#connections` section copy/positioning** (`index.html`) is still unsettled - its nav label was deliberately left as a neutral "Connections" for this reason. Revisit once its actual audience/positioning is decided.
- **`#connections`'s CTA destination** currently points at the generic email footer. The intent is to route it to a real scicomm channel (Substack, LinkedIn, etc.) once one exists - nothing to change until then.

There are also some additional polish, UX, and SEO items that depend on decisions outside the site itself, but are worth considering for later:

- **Testimonials** on `job-search-help.html` - reserved as a commented-out block in the file, ready to uncomment once real ones exist.
- Other `job-search-help.html` additions worth considering: an FAQ (pricing/format/turnaround), a "who this is for" section, or a before/after resume sample.
- **JSON-LD structured data for individual case studies** (`_layouts/case.html` currently has none - only the site-wide `Person` schema in `_include/header.html` exists). Deferred because it's not yet settled how permanent/authoritative case studies are meant to be; revisit once that's decided.
- **Dark mode.** Feasible, but not a drop-in addition: the color system in `_css/main.scss` is all compile-time SCSS `$variables`, not runtime CSS custom properties, and a proper implementation (e.g. `light-dark()` + `color-scheme`, as in [this approach](https://fedknu.com/blog/adding-dark-mode-to-11ty-blog/)) needs runtime-switchable values. That means migrating the whole `$color*` system to CSS custom properties first - a real refactor, not a toggle bolted on top. It's also a genuine design question, not just technical: the site already deliberately mixes dark (hero/nav) and light (article/case-study) sections as part of its identity, rather than being uniformly "light" with a dark alternative - "dark mode" would need its own definition here, not just an inverted palette. Low urgency; worth doing only if/when the color system gets revisited for other reasons.

## Pre-launch checklist

The following non-content, non-copy work should be done before treating this site as fully launched.

>[!NOTE]
> The issue of case studies remaining hidden also appears in the [Content backlog](#content-backlog) above. This is the one and only item on both lists due to its outsized importance.

- **Case studies need to actually be visible.** See [Content backlog](#content-backlog) above.
- ~~The `pages.dev` deployment should be `noindex`.~~ **Done:** a Cloudflare Transform Rule adds `X-Robots-Tag: noindex` for requests where the hostname isn't `keitaay.com` - a build-time meta tag couldn't do this, since Cloudflare Pages serves the identical build at both the custom domain and the default `pages.dev` alias.
- ~~Case study images still aren't optimized.~~ **Done:** `eleventyImageTransformPlugin` (`@11ty/eleventy-img`) now generates responsive, modern-format (`webp`/`jpeg`) `<picture>` output for every `imageHero` usage site. See the `gbcc.md` note above for one known side effect of this pipeline's error tolerance.
- ~~CSS/JS aren't minified in the build output.~~ **Done:** `scripts/minify-assets.mjs` runs as a postbuild step (`npm run build`), minifying `_public/_css/*.css` and `_public/_js/*.js` in place while `src/` and the local dev server stay exactly as readable as before.
- **Live cross-browser/device testing**, including the `<noscript>` fallback path (untested with JS actually disabled) and the obfuscated email link in `_js/ui.js` (works in dev; never explicitly confirmed against the production build).
- **SEO verification, once live:** submit the sitemap to Google Search Console and Bing Webmaster Tools; spot-check social-share previews (OG/Twitter card) on a few pages with a real link-preview tool, since several case studies still have a placeholder `imageHero` feeding `og:image`.
- **QA automation:** find a lightweight way to run an accessibility check (e.g. Axe or Lighthouse) as part of the build/test pipeline, alongside the existing placeholder-content guard (`scripts/check-content.mjs`, wired as `npm test`).

Site security headers (CSP, `X-Frame-Options`, etc.) are already live via Cloudflare Transform Rules and verified working. Uptime monitoring is being handled directly through Cloudflare, not tracked here.
