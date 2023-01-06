module.exports = function (eleventyConfig) {
    const Nunjucks = require('nunjucks');

    // Copy additional files to the output folder
    eleventyConfig.addPassthroughCopy("src/css/*.css");
    eleventyConfig.addPassthroughCopy("src/js");

    // Configure Nunjucks template generator
    let nunjucksEnvironment = new Nunjucks.Environment(
        new Nunjucks.FileSystemLoader([
            "src/layouts",
        ])
    );
    eleventyConfig.setLibrary("njk", nunjucksEnvironment);

    // Create filters for some common tasks
    eleventyConfig.addFilter("getYear", function (date) {
        const d = new Date(date);
        return d.getFullYear();
    });

    // Return Object
    return {
        dir: { // all paths except for input/output are relative to the input directory
            input: "src",
            output: "_public",
            data: "data",
            includes: "include",
            layouts: "layouts",
        },
        htmlTemplateEngine: "njk",
        pathPrefix: "/", // for GitHub, change to "/keitaay/"
    }
};