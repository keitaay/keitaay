# Kéita's personal portfolio

This folder contains the source code for my personal website, hosted on GitHub Pages. The website is built using 11ty, a static site generator that's great for creating simple, fast websites. The website is built using a combination of custom-written HTML, CSS, and JavaScript, and is designed to be simple, easy to navigate, and responsive across a variety of devices.

## 🛠️ Getting Started

To create a local copy, download:

- A system with a modern web browser
- [Node.js](https://nodejs.org/en/) v22.0 or higher
- [11ty](https://www.11ty.dev/) v3.0 or higher
- [Prettier](https://prettier.io/) to maintain consistent code formatting

Then run:

```
npx @11ty/eleventy --serve
```

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
  - `llms.txt`: Website descriptions for web crawlers and AI tools.
  - `.eleventyignore`: Files and folders to ignore when building this site.
  - `README.md`: **This file**; Source code and how to run it locally.
  
- `.eleventy.js`: Configuration file for 11ty.
  
- `package.json` and `package-lock.json`: Node.js package definitions for this website.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
