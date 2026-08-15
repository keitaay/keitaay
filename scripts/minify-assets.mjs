// Minifies the build output only - src/_css/*.css and src/_js/*.js stay
// exactly as readable as they are today. Runs as a postbuild step (see
// package.json's "build" script) after eleventy has already passthrough-
// copied those files into _public/ verbatim.
import fs from "node:fs";
import path from "node:path";
import CleanCSS from "clean-css";
import { minify } from "terser";

const publicDir = path.join(import.meta.dirname, "..", "_public");
const cssDir = path.join(publicDir, "_css");
const jsDir = path.join(publicDir, "_js");

const failures = [];

function logSize(file, before, after) {
    const pct = (100 * (1 - after / before)).toFixed(1);
    console.log(`  ${file}: ${before}B -> ${after}B (-${pct}%)`);
}

if (fs.existsSync(cssDir)) {
    console.log("Minifying CSS:");
    for (const file of fs.readdirSync(cssDir).filter((f) => f.endsWith(".css"))) {
        const filePath = path.join(cssDir, file);
        const original = fs.readFileSync(filePath, "utf-8");
        const output = new CleanCSS({}).minify(original);

        if (output.errors.length > 0) {
            failures.push(`${file}: ${output.errors.join("; ")}`);
            continue;
        }

        fs.writeFileSync(filePath, output.styles);
        logSize(file, Buffer.byteLength(original), Buffer.byteLength(output.styles));
    }
}

if (fs.existsSync(jsDir)) {
    console.log("Minifying JS:");
    for (const file of fs.readdirSync(jsDir).filter((f) => f.endsWith(".js"))) {
        const filePath = path.join(jsDir, file);
        const original = fs.readFileSync(filePath, "utf-8");

        try {
            // toplevel is deliberately left at its default (false): ui.js
            // exposes window.hasPrevPage and a top-level navAway() that
            // random-case.js (a separate <script>) calls as a bare global -
            // enabling toplevel mangling/compression would silently break
            // that cross-script contract.
            const result = await minify(original, { compress: true, mangle: true });
            fs.writeFileSync(filePath, result.code);
            logSize(file, Buffer.byteLength(original), Buffer.byteLength(result.code));
        } catch (err) {
            failures.push(`${file}: ${err.message}`);
        }
    }
}

if (failures.length > 0) {
    console.error("\nAsset minification failed:\n");
    failures.forEach((f) => console.error(`  - ${f}`));
    process.exit(1);
}
