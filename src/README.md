# Kéita's personal portfolio

This folder contains the source code for my personal website, hosted on GitHub Pages. The website is built using 11ty, a static site generator that's great for creating simple, fast websites. The website is built using a combination of custom-written HTML, CSS, and JavaScript, and is designed to be simple, easy to navigate, and responsive across a variety of devices.

## 🛠️ Getting Started

To create a local copy, download:

- A system with a modern web browser
- [Node.js](https://nodejs.org/en/) v22.0 or higher
- [11ty](https://www.11ty.dev/) v3.0 or higher
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


## 🗂️ Repository structure

The website is organized as a set of pages specific to my professional roles, and a larger set of case studies that highlight my previous work.

- `src/`: **This folder**; Source files for content on this website.
  - `cases/`: Case studies of my previous work, described in more detail in [its corresponding readme](./cases/README.md).
    - `img/`: Images used in the case studies.
    - `cases.json`: JSON file that defines the case study collection for 11ty.
    - `**/*.md`: Individual case studies, written in Markdown with frontmatter metadata.
  - `_css/`: Stylesheets for this website.
  - `_js/`: JavaScript files for this website.
  - `_include`: Reusable HTML snippets for this website.
  - `_layouts`: Layout templates for this website.
  - `*.html`: Template for specific pages.
  - `favicon.svg`: Base file for the favicon for this website.
  - `sitemap.md`: Template for the sitemap of this website.
  - `robots.txt`: Instructions for web crawlers on how to index this site.
  - `llms.txt`: Website descriptions for web crawlers and AI tools.
  - `.eleventyignore`: Files and folders to ignore when building this site.
  - `README.md`: **This file**; Source code and how to run it locally.
  
- `.eleventy.js`: Configuration file for 11ty.
  
- `package.json`, `package-lock.json`, and `.nojekyll`: Node.js package definitions for this website.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
