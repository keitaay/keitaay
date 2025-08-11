# Kéita's personal portfolio

This folder contains the source code for my personal website, hosted on GitHub Pages. The website is built using 11ty, a static site generator that's great for creating simple, fast websites. The website is built using a combination of custom-written HTML, CSS, and JavaScript, and is designed to be simple, easy to navigate, and responsive across a variety of devices.

To create a local copy, download:

- A system with a modern web browser
- [Node.js](https://nodejs.org/en/) v. 22.0 or higher
- [11ty](https://www.11ty.dev/) v.3.0 or higher
- [Prettier](https://prettier.io/) to maintain consistent code formatting

Then run:

```
npx @11ty/eleventy --serve
```

## Repository structure

The website is organized as a set of pages specific to my professional roles, and a larger set of case studies that highlight my previous work.

- `src/`: **This folder** - Source files for content on this website.
  - `cases/`: Case studies of my previous work, described in more detail in [its corresponding readme](./cases/README.md).
    - `img/`: Images used in the case studies.
    - `cases.json`: JSON file that defines the case study collection for 11ty.
  - `_css/`: Stylesheets for this website.
  - `_js/`: JavaScript files for this website.
  - `_include`: Reusable HTML snippets for this website.
  - `_layouts`: Layout templates for this website.
  - `*.html`: Template for specific pages.
  - `llms.txt`: Website descriptions for web crawlers and AI tools.
  - `README.md`: This file, describing the source code and how to run it locally.
  
- `.eleventy.js`: Configuration file for 11ty.
  
- `package.json` and `package-lock.json`: Node.js package definitions for this website.
