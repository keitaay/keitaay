---
name: case-study
description: Interactive brainstorming, outlining, and image-candidate workflow for case studies in src/cases/*.md. Use when the user wants to decide whether a project is worth writing up, structure a new case study, or figure out what images a case study needs. Does not write finished prose — the user writes case studies in their own words.
---

# Case study workflow

This skill helps develop case studies for `src/cases/*.md` on Kéita's personal portfolio site. It has three modes — brainstorm, outline, and images — used together or separately depending on what the user asks for.

**Hard constraint: never write finished body prose for a case study, even if asked to "just write it."** The whole point of this site is that case studies are in the user's own words. If asked to draft prose, produce a scaffold with guiding questions/bullet prompts instead, and say explicitly that it's a starting point to rewrite, not a final draft.

## Before doing anything: ground in the current schema

Read these files fresh every time this skill is invoked — don't rely on memory of the schema, since it can change:

- `src/cases/README.md` — the authoritative frontmatter schema and body structure (Problem / Solution / Results).
- `src/cases/cases.json` — directory-level frontmatter defaults.
- One or two existing files in `src/cases/*.md` — to see current tone, the `roles`/`tags` values actually in use, and how much (or little) content already exists for that project.

If the schema in `README.md` and what's actually used in the `.md` files disagree, flag the discrepancy to the user rather than silently picking one.

## Mode: brainstorm

Use when the user is deciding whether a project is worth a case study, or wants help finding the angle.

- Ask what the project was, what the user's role was, and what made it interesting or hard — don't assume a "win" narrative is required.
- Weigh it against what's already covered: check existing `tags`, `roles`, and `subject` values across current case studies so a new one adds a distinct angle rather than duplicating one that exists.
- Surface real arguments against writing it up too (e.g., thin material, overlaps heavily with an existing case, NDA/confidentiality concerns, no visual evidence available) — this mode should help the user say no to weak candidates, not just talk them into everything.
- End with a clear recommendation (write it up / hold off / needs more material first) and why, not just an open-ended discussion.

## Mode: outline

Use when the user wants to structure a specific case study, new or existing.

Produce:
1. A frontmatter stub following the exact schema in `src/cases/README.md` (all fields the user has info for; leave others as `TODO` rather than inventing plausible-sounding values). Reuse existing `roles` values where they fit — that field is a fixed, filterable set, not freeform.
2. A skeleton with the three `##` headings (Problem, Solution, Results) per the README's structure, each populated not with prose but with the specific guiding questions the user should answer for *this* project (e.g. "what was the KPI or constraint that made this hard?" rather than a generic prompt) — pull these from what the user has already told the skill in conversation, so the questions are concrete, not templated filler.
3. Under Solution, if the project involved a multi-step process (personas, sketches, interviews, wireframes, prototypes, etc.), suggest it as a bullet list per the README's convention — but only propose steps the user has actually described, don't invent a generic design-process list.

## Mode: images

Use when the user wants to figure out what visuals a case study needs — can be run standalone or as part of an outline pass.

For each place an image would help (hero image, and any inline visuals implied by the Solution section's process):
- Name specifically what kind of image belongs there (a screenshot of a specific screen/artifact, a photo of the physical work, a before/after comparison, a process diagram) and why that slot needs a visual at all — don't propose images for sections that don't need one.
- Default to **identifying candidates**: describe what to look for among the user's own existing photos/screenshots/exports, and where in the project's history it likely came from.
- Only offer to **generate** a placeholder (e.g. a process diagram or wireframe mockup) for a specific slot when no real photo/screenshot is likely to exist for it — ask the user first, don't generate unprompted, since this is a per-case judgment call, not a default behavior.
- Note the existing convention: images live flat in `src/cases/img/` (no per-case subfolders) and are referenced in frontmatter as `/cases/img/<file>.jpg`.
