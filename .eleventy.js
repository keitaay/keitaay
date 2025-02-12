module.exports = function (eleventyConfig) {
    const Nunjucks = require('nunjucks');

    // Copy additional files to the output folder
    eleventyConfig.addPassthroughCopy("src/_css/*.css");
    eleventyConfig.addPassthroughCopy("src/_js");
    eleventyConfig.addPassthroughCopy("src/cases/img");

    // Create filters for some common tasks
    eleventyConfig.addFilter("getYear", function (date) {
        const d = new Date(date);
        return d.getFullYear();
    });
    eleventyConfig.addFilter("limit", function (arr, limit) {
        return arr.slice(0, limit);
    });
    eleventyConfig.addFilter('getRole', function (arr, role) {
        if (!arr || !Array.isArray(arr)) {
            return [];
        }
        return arr.filter(item => item.data.roles.includes(role))
    });
    eleventyConfig.addFilter('exclude', function (arr) {
        if (!arr || !Array.isArray(arr)) {
            return [];
        }
        return arr.filter(item => !item.data['doIgnore'])
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