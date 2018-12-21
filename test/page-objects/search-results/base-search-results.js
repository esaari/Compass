/**
 * Selectors and functions for page elements present on all search result pages
 * @type {string}
 */

const route = "search/";

const selectors = {
    "numberBedrooms": ".uc-lol-mainViewTranscluder .uc-listingCard-subStat--beds",
    "numberBathrooms": ".uc-lol-mainViewTranscluder .uc-listingCard-subStat--baths",
    "globalScriptObject": "script:not([src])"
};

/**
 * Uses regex to modify and return an enumerable object from
 * global script object
 * @param string
 * @returns {string}
 */
function formatScriptTag(string) {
    const regEx = /\(function \(global\) {(\s*)    global.uc =/;
    const regEx2 = /;(\s*) }\)\(this\);/;
    let firstModify = string.replace(regEx, "");
    return firstModify.replace(regEx2, "").trim();
}

export { route, selectors, formatScriptTag }