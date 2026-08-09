# Kéita's personal portfolio

This folder contains the source code for my personal website, deployed as a static site. The website is built using the static site generator 11ty, custom-written HTML, CSS, and JavaScript to be simple, easy to navigate, and responsive across a variety of devices.

## Getting Started

To create a local copy, download:

- A system with a modern web browser
- [Node.js](https://nodejs.org/en/) v22.0 or higher
- [11ty](https://www.11ty.dev/) v3.1.6 (as of Aug. 2026, code is not prepared for naming changes proposed in Build Awesome v4)
- [Prettier](https://prettier.io/) to maintain consistent code formatting

Then, install necessary Node packages through `npm` by running the following command from your terminal in the root of this project:

```bash
npm install
```

This will install the following required packages, as well as their dependencies:

- `eleventy`: The static site generator used to build the website.
- `eleventy-plugin-gen-favicons`: An 11ty plugin to generate favicons for the website.

You can now edit your local copy of this website however you please. When you want to build the full version of this website, run a local development server with the following command:

```
npx @11ty/eleventy --serve
```

> **Note:** [`package.json`](./package.json), which governs what `npm install` installs, also includes a third dependency: `sharp`. However, this library is actually a dependency of `eleventy-plugin-gen-favicons`. `package.json` file explicitly indicates it as a requirement only because some Node installations fail to install it automatically; this website does not directly call `sharp` at the time of writing.


## Repository structure

The website is a single-page, scroll-based homepage covering my main areas of work, plus a couple of standalone pages (a case-study index and a job search help service page) and a larger set of case studies that highlight my previous work.

- `src/`: **This folder**; Source files for content on this website.
  - `cases/`: Case studies of my previous work, described in more detail in [its corresponding readme](./cases/README.md).
    - `img/`: Images used in the case studies.
    - `cases.json`: JSON file that defines the case study collection for 11ty.
    - `**/*.md`: Individual case studies, written in Markdown with frontmatter metadata.
  - `_css/`: Stylesheets for this website.
  - `_js/`: JavaScript files for this website.
  - `_include`: Reusable HTML snippets and metadata partials for this website.
  - `_layouts`: Layout templates for this website.
  - `*.html`: Template for specific pages.
  - `favicon.svg`: Base file for the favicon for this website.
  - `sitemap.md`: Template for the sitemap of this website.
  - `robots.txt`: Instructions for web crawlers on how to index this site.
  - `.eleventyignore`: Files and folders to ignore when building this site.
  - `README.md`: **This file**; Source code and how to run it locally.
  
- `.eleventy.js`: Configuration file for 11ty.
  
- `package.json`, `package-lock.json`, and `.nojekyll`: Node.js package definitions for this website.

## Page metadata

Every page can set `title:` and `description:` in its front matter. Together with `imageHero:` (already used by case studies), these automatically populate the page's `<title>`, meta description, canonical URL, and Open Graph/Twitter preview tags via `_include/header.html` - no per-page template edits needed. Pages that don't set `description:` fall back to a case study's own `summary:`, then to `site.defaultDescription` (`.eleventy.js`), so no page ever ships an empty description - but a real, page-specific one reads much better in search results and shared links. Site-wide identity fields (`site.name`, `site.url`) live in `.eleventy.js`; the Person schema (JSON-LD) they feed into is in `_include/person.json`.

## Content backlog

A number of content items are deliberately deferred, not forgotten. Content/asset work only I can do:

- **Case studies are hidden until they're actually ready, not just written.** All 6 files in `src/cases/*.md` are marked `doIgnore: true` (hides them from every listing - homepage, `/cases`, tag pages, "related cases") because none currently have real content, and it's not just an unwritten-body-copy problem:
  - Every case's `brief:` front matter field is still the literal placeholder `"Text blah blah blah."`, which renders directly as visible page copy via `_layouts/case.html` - a shipped bug if any of these were ever unhidden as-is, not just an empty Markdown body.
  - `imageHero:` for 4 of the 6 is the neutral placeholder SVG (`cases/img/placeholder-hero.svg`), which also feeds that page's `og:image` - a shared link preview for one of these would currently show the placeholder, not a real photo.
  - Every case-study `<img>` has `alt=""`. Currently harmless since the placeholder SVG carries no information and the visible caption text duplicates whatever a real image would show - but real photography (see below) will carry information a plain-text caption doesn't fully substitute for. Revisit alt text at the same time real images go in, not as a separate pass.
  - Write the flagship case first - `dopio_development.md` or `transplant_visr.md` are the best-fitted candidates - including a real `brief`, then flip its `doIgnore` to `false`. Don't unhide the rest until each is individually ready; a single strong case beats several thin ones.
  - **Known limitation:** `doIgnore` only removes a case from listings (via the custom `exclude` filter used throughout the templates); 11ty still builds and publishes the individual page at its direct URL regardless. A hidden case is hard to stumble onto, but not truly unpublished - a direct link or search-engine crawl could still reach it. A complete "draft" mechanism (e.g. a computed `permalink: false` via `eleventyComputed`) would prevent the page from building at all, but that's untested here and worth doing deliberately later, not as a quick add-on now.
- **A real headshot photo.** None exists yet for the "Who is Kéita?" section (`index.html`).
- **`job-search-help.html`'s "Why Work With Me" section** still has placeholder credibility copy (marked with an HTML comment in the file) - needs my actual relevant experience before this page is really ready to publish.

Waiting on decisions outside the site itself:

- **`#connections` section copy/positioning** (`index.html`) is still unsettled - its nav label was deliberately left as a neutral "Connections" for this reason. Revisit once its actual audience/positioning is decided.
- **`#connections`'s CTA destination** currently points at the generic email footer. The intent is to route it to a real scicomm channel (Substack, LinkedIn, etc.) once one exists - nothing to change until then.

Optional polish, whenever:

- **Testimonials** on `job-search-help.html` - reserved as a commented-out block in the file, ready to uncomment once real ones exist.
- Other `job-search-help.html` additions worth considering: an FAQ (pricing/format/turnaround), a "who this is for" section, or a before/after resume sample.
- **Dark mode.** Feasible, but not a drop-in addition: the color system in `_css/main.scss` is all compile-time SCSS `$variables`, not runtime CSS custom properties, and a proper implementation (e.g. `light-dark()` + `color-scheme`, as in [this approach](https://fedknu.com/blog/adding-dark-mode-to-11ty-blog/)) needs runtime-switchable values. That means migrating the whole `$color*` system to CSS custom properties first - a real refactor, not a toggle bolted on top. It's also a genuine design question, not just technical: the site already deliberately mixes dark (hero/nav) and light (article/case-study) sections as part of its identity, rather than being uniformly "light" with a dark alternative - "dark mode" would need its own definition here, not just an inverted palette. Low urgency; worth doing only if/when the color system gets revisited for other reasons.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
