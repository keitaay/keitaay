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
location: City or region of project
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
accoladeList:
  - Award or recognition
```

The following table describes each field:

| Field         | Purpose                            | Notes                                                        |
| ------------- | ---------------------------------- | ------------------------------------------------------------ |
| **title**     | Headline for the case study        | Emphasize need or solution demonstrated                      |
| **doIgnore**  | Boolean                            | If `true`, 11ty will hide it from collections                |
| **tags**      | Grouping keywords                  | Example: `Featured`, `Case Study`                            |
| **subject**   | Client name or core skill/tool     | Used in listings and metadata                                |
| **location**  | Location of project or client      | Optional, used for filtering or context                      |
| **roles**     | Professional capacities            | Choose from: `Engineer`, `Strategist`, `Designer`, `Citizen` |
| **dateProj**  | When project occurred              | Free text (`Spring 2024`, `2021–2022`)                       |
| **imageHero** | Path to hero image                 | Relative to `/cases/img`                                     |
| **linkLive**  | External link to live project/demo | Optional                                                     |
| **summary**   | One-line summary of project        | One brief phrase or sentence about project                   |
| **brief**     | Project brief                      | 1–3 sentences, appears at top of page                        |
| **taskList**  | Key project tasks                  | Optional, bullet points                                      |
| **techList**  | Tools/technologies used            | Optional, bullet points                                      |
| **accoladeList** | Awards or recognitions received | Optional, bullet points                                      |

Note that the the one-line summary (i.e. the `summary` field) is distinct from the project brief (i.e. the `brief` field). On one hand, the former provides a brief summary of "what is this project?" under the title of this case's page. On the other hand, the latter item provides a short overview of the problem, solution, and results of the case study. It should be concise and engaging, setting the stage for the detailed content that follows.

### 🎯 Markdown Body

The Markdown content should be structured into three main sections:

1. **Problem**
  Describes the challenge being addressed — business requirements, user needs, pain points, target markets, technical constraints, or KPIs.

2. **Solution**
    Shows how you addressed the problems identified.
    
    First, I'll outline the design process steps and methods followed during the project. This includes all major steps taken, as well as justifications for why I chose the methods used.
    
    Then, explain how the goals were achieved — key decisions, process steps, artifacts, and deliverables. This could include:
    
    - Personas
    - Sketches
    - Interview notes
    - Usability tests results
    - Whiteboards
    - Wireframes
    - UI designs
    - Prototypes

3. **Results**
  Summarizes outcomes — metrics, next steps, lessons learned, and how the work contributed to project and career growth.

## 💡 Authoring Tips

The following are key principles that I've kept in mind when authoring case studies:

- **Consistency matters.** Reuse tags and roles so filtering works.

- **Clarity over cleverness.** Summaries should help people immediately understand the project.

- **Visuals are valuable.** Include relevant images wherever possible.

- **Keep scope tight.** Each case study should be a focused story.
