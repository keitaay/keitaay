# Kéita's personal portfolio

This repository is the source code for my personal website, which is hosted on GitHub Pages. The website is built using 11ty, a static site generator that's great for creating simple, fast websites. The website is built using a combination of custom-written HTML, CSS, and JavaScript, and is designed to be simple, easy to navigate, and responsive across a variety of devices.

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

- `/src/`: Source files for content on this website.
  - `/cases/`: Case studies of my previous work, described in more detail after this section.
    - `img/`: Images used in the case studies.
    - `cases.json`: JSON file that defines the case study collection for 11ty.
  - `/_css/`: Stylesheets for this website.
  - `/_js/`: JavaScript files for this website.
  - `/_include`: Reusable HTML snippets for this website.
  - `/_layouts`: Layout templates for this website.
  - `index.html`: Template for home page.
  - `*.html`: Template for role-specific pages.
- `.eleventy.js`: Configuration file for 11ty.
- `package.json` and `package-lock.json`: Node.js package definitions for this website.

## Case studies

Each case study is associated with one or more roles that I can fulfill at a professional capacity. This information, as well as other metadata that can be associated with each case study, is stored as [YAML front matter](https://jekyllrb.com/docs/front-matter/) in each case study's Markdown file. Each case study's YAML objects are used to populate specific parts of 11ty's page templates, and the fully-completed page is rendered as individual webpage on the website.

```yaml
title: Text #                - Case study title
doIgnore: false #            - Hide case study from website?
tags: #                      - Tags for grouping case studies
  - Featured
subject: Text #              - Client or technology name
roles: #                     - Roles fulfilled
  - Engineer
  - Strategist
  - Designer
  - Citizen
dateProj: Fall 2022 #       - Date of project
imageHero: /cases/img/... # - Main image to represent project
linkLive: https://... #     - Link to live project deliverable
summary: Text #             - 1-sentence tagline of task
brief: Text #               - Short paragraph about project
taskList: #                 - Releveant skills used
  - Text 1
  - Text 2
techList: #                 - Technologies used
  - Text 1
  - Text 2
```

The remainder of source files for each case study are written in Markdown, and are organized into the following sections:

- **Problem:** Description of the problem that a project is trying to address. This may include discussions of business requirements, user needs, pain points, end-users, target markets, platforms, technical constraints, or business KPIs.

- **Solution:** Description of how a project's goals were achieved. This should include steps in the design process, justifications for key decisions, design artifacts, and any relevant deliverables. This section may include artifacts such as:

  - Personas
  - Sketches
  - Interview notes
  - Usability tests results
  - Whiteboards
  - Wireframes
  - UI designs
  - Prototypes

- **Results:** Description of the project's success metrics, next steps, or lessons learned. This section should make the case for how I was invested in both the project’s life cycle and my career development.
