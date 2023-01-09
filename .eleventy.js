module.exports = function (eleventyConfig) {
    const Nunjucks = require('nunjucks');

    // Copy additional files to the output folder
    eleventyConfig.addPassthroughCopy("src/_css/*.css");
    eleventyConfig.addPassthroughCopy("src/_js");

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
            includes: "_include",
            layouts: "_layouts",
        },
        htmlTemplateEngine: "njk",
        pathPrefix: "/", // for GitHub, change to "/keitaay/"
    }
};