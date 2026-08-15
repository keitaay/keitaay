# Kéita's personal portfolio

This folder contains the source code for my personal website, deployed as a static site. The website is built using the static site generator 11ty, custom-written HTML, CSS, and JavaScript to be simple, easy to navigate, and responsive across a variety of devices.

## Getting Started

To create a local copy, download:

- A system with a modern web browser
- [Node.js](https://nodejs.org/en/) v22.12.0 or higher
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

>[!NOTE]
> `package.json`'s `overrides` includes dependency overrides for some tools that are only used for internal development. Notably, `pa11y-ci` (an accessibility audit tool) has the transitive dependency `puppeteer`, (and downstream to it, `extract-zip`, which has an unpatched high-severity advisory without any fixes released). This behavior is overridden by updating `puppeteer` such that `extract-zip` is replaced by the safer `modern-tar`.


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

## Roadmap

Deferred content/copy work and pre-launch technical work are tracked outside this folder, in [`ROADMAP.md`](./ROADMAP.md) at the repo root - kept out of `src/` (11ty's input directory) so it can never be accidentally built into a page on the site itself.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
