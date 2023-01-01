module.exports = function (eleventyConfig) {
    // Return your Object options:
    return {
        dir: {
            input: "src",
            output: "_public",
            data: "data",
            includes: "layouts"
        },
    }
};