module.exports = function (eleventyConfig) {
    const Nunjucks = require('nunjucks');

    // Copy additional files to the output folder
    eleventyConfig.addPassthroughCopy("src/_css/*.css");
    eleventyConfig.addPassthroughCopy("src/_js");
    eleventyConfig.addPassthroughCopy("src/cases/img");

    // Create filters for some common tasks
    eleventyConfig.addFilter("getYear", function (date) {
        /*
        Given a date, return the year as a 4-digit number.
        */
        const d = new Date(date);
        return d.getFullYear();
    });
    eleventyConfig.addFilter("intersect", function(arr1, arr2) {
        /*
        Given two arrays, return a new array containing only the elements that are present in both arrays.
        */
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];
        return arr1.filter(value => arr2.includes(value));
    });
    eleventyConfig.addFilter("limit", function (arr, limit) {
        /*
        Given an array of case studies and a limit, return a new array with at most 'limit' items.
        */
        return arr.slice(0, limit);
    });
    eleventyConfig.addFilter('getRole', function (role) {
        /*
        Given an array of case studies with a 'data.roles' array, return a new array containing only the items that include the specified role.
        */
        arr = eleventyConfig.collections['Case Study'];
        if (!arr || !Array.isArray(arr)) {
            return [];
        }
        return arr.filter(item => item.data.roles.includes(role))
    });
    eleventyConfig.addFilter('exclude', function (arr) {
        /*
        Given an array of case studies with a 'data.doIgnore' boolean, return a new array that excludes items where 'doIgnore' is true.
        */
        if (!arr || !Array.isArray(arr)) {
            return [];
        }
        return arr.filter(item => !item.data['doIgnore'])
    });
    eleventyConfig.addFilter('getOneExample', function (arr, tag) {
        /*
        Given an array of case studies and a tag, return the first item that has the specified tag. The input array must undergo the "exclude" filter first.
        */
        if (!arr || !Array.isArray(arr)) {
            return {};
        }
        const filtered = arr.filter(item => item.data.tags && item.data.tags.includes(tag));
        return filtered.length > 0 ? filtered[0] : {};
    });
    eleventyConfig.addFilter("relatedCases", function(cases, currentUrl, currentTags, limit = 5) {
        /*
        Given an array of case studies, the current URL, and the current tags, return a new array of related case studies. The returned array will contain at most 'limit' items, excluding the current case study (identified by its URL) and those that do not share any tags with the current case study.
        */
        if (!Array.isArray(cases) || !Array.isArray(currentTags)) return [];
        
        // Tags to ignore
        const ignoreTags = ["Case Study", "Featured"];

        // Remove ignored tags from currentTags
        const filteredCurrentTags = currentTags.filter(tag => !ignoreTags.includes(tag));
        return cases
            .filter(item =>
                item.url !== currentUrl &&
                item.data &&
                Array.isArray(item.data.tags) &&
                !item.data.doIgnore &&
                // Remove ignored tags from item's tags
                item.data.tags.filter(tag => !ignoreTags.includes(tag))
                    .some(tag => filteredCurrentTags.includes(tag))
            )
            .slice(0, limit);
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