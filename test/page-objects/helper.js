/**
 * "Helper" functions that would be commonly called across many page objects.
 */


/**
 * Helper method for clearing a single or list of text fields of placeholder text
 * @param page: Puppeteer page object
 * @param selectors: A single string representing a selector or an array of strings
 * @returns {Promise<void>}
 */
async function clearTextFields(page, selectors) {
    if (Array.isArray(selectors)) {
        for (let selector of selectors) {
            page.$eval(selector, textField => textField.value = "");
        }
    } else
        page.$eval(selectors, textField => textField.value = "");
}

/**
 * Helper method for returning trimmed text displayed to the user from a single
 * or list of elements
 * @param page: Puppeteer page object
 * @param selectors: A single string representing a selector or an array of strings
 * @returns {Promise<Array>} or single promise for single selector
 */
async function getInnerText(page, selectors) {
    if (Array.isArray(selectors)) {
        let innerText = [];
        for (let selector of selectors) {
            innerText.push(await page.$eval(selector, element => element.innerText.trim()));
        }
        return innerText;
    } else
        return await page.$eval(selectors, element => element.innerText.trim());
}

/**
 * Return text in an array from a selector that returns multiple page elements
 * @param page
 * @param selector
 * @returns {Promise<Array>}
 */
async function getAllInnerText(page, selector) {
    let innerText = [];
    const elements = await page.$$(selector);
    for (let element of elements) {
        innerText.push(await page.evaluate(text => text.innerText.trim(), element))
    }
    return innerText;
}

export { clearTextFields, getInnerText, getAllInnerText }