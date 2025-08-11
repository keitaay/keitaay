# Case Studies

Case studies document selected projects I’ve worked on, highlighting problems solved, solutions delivered, and results achieved. They are written in Markdown and stored in this directory.

Eleventy (11ty) automatically generates a page for each case study based on its Markdown file and YAML front matter.

## 📝 File Structure

Each case study file contains:

- YAML front matter: metadata for grouping, filtering, and displaying case studies across the site.

- Markdown body: the full narrative of the case.

### 🗣️ YAML Front Matter

For example:

```yaml
title: Title for this case
doIgnore: false
tags:
  - Featured
subject: Client name or tool/skill demonstrated
roles:
  - Engineer
  - Strategist
dateProj: Fall 2022
imageHero: /cases/img/hero-image.jpg
linkLive: https://some-live-link.com
summary: Short, one-sentence tagline
brief: One-to-three sentence description
taskList:
  - Key task 1
  - Key task 2
techList:
  - Tool or framework
  - Another technology
```

The following table describes each field:

| Field         | Purpose                            | Notes                                                        |
| ------------- | ---------------------------------- | ------------------------------------------------------------ |
| **title**     | Headline for the case study        | Emphasize the need or solution demonstrated                  |
| **doIgnore**  | Boolean                            | If `true`, 11ty will skip generating a page                  |
| **tags**      | Grouping keywords                  | Example: `Featured`, `Case Study`                            |
| **subject**   | Client name or core skill/tool     | Used in listings and metadata                                |
| **roles**     | Professional capacities            | Choose from: `Engineer`, `Strategist`, `Designer`, `Citizen` |
| **dateProj**  | When project occurred              | Free text (`Spring 2024`, `2021–2022`)                       |
| **imageHero** | Path to hero image                 | Relative to `/cases/img`                                     |
| **linkLive**  | External link to live project/demo | Optional                                                     |
| **summary**   | Short tagline                      | One sentence, practical not poetic                           |
| **brief**     | Introductory paragraph             | 1–3 sentences, appears at top of page                        |
| **taskList**  | Key project tasks                  | Optional, bullet points                                      |
| **techList**  | Tools/technologies used            | Optional, bullet points                                      |


### 🎯 Markdown Body

The Markdown content should be structured into three main sections:

1. **Problem**
  Describe the challenge being addressed — business requirements, user needs, pain points, target markets, technical constraints, or KPIs.

2. **Solution**
  Explain how the goals were achieved — key decisions, process steps, artifacts, and deliverables. May include:
    - Personas
    - Sketches
    - Interview notes
    - Usability test results
    - Wireframes / UI designs
    - Prototypes

3. **Results**
  Summarize outcomes — metrics, next steps, lessons learned, and how the work contributed to project and career growth.

## 💡 Authoring Tips

The following are key principles that I've kept in mind when authoring case studies:

- **Consistency matters.** Reuse tags and roles so filtering works.

- **Clarity over cleverness.** Summaries should help people immediately understand the project.

- **Visuals are valuable.** Include relevant images wherever possible.

- **Keep scope tight.** Each case study should be a focused story.
