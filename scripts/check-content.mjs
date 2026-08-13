// Guards against the "shipped placeholder" bug flagged in src/README.md:
// a case study left doIgnore:false (or unset) while its brief/imageHero
// frontmatter still points at placeholder content. Hidden cases (doIgnore:
// true) are allowed to be unfinished - only visible ones are checked.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const casesDir = path.join(import.meta.dirname, "..", "src", "cases");
const PLACEHOLDER_BRIEF = "Text blah blah blah.";
const PLACEHOLDER_HERO = "/cases/img/placeholder-hero.svg";

const files = fs.readdirSync(casesDir).filter((f) => f.endsWith(".md") && f !== "README.md");
const failures = [];

for (const file of files) {
    const filePath = path.join(casesDir, file);
    const { data } = matter(fs.readFileSync(filePath, "utf-8"));

    if (data.doIgnore) continue;

    if (data.brief === PLACEHOLDER_BRIEF) {
        failures.push(`${file}: doIgnore is false, but 'brief' is still the placeholder text.`);
    }
    if (data.imageHero === PLACEHOLDER_HERO) {
        failures.push(`${file}: doIgnore is false, but 'imageHero' still points at the placeholder SVG.`);
    }
}

if (failures.length > 0) {
    console.error("Content check failed:\n");
    failures.forEach((f) => console.error(`  - ${f}`));
    console.error(`\n${failures.length} problem(s) found.`);
    process.exit(1);
}

console.log(`Content check passed (${files.length} case ${files.length === 1 ? "study" : "studies"} checked).`);
