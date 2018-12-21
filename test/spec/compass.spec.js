/**
 * Test setup/teardown and steps utilizing page objects for the requested problems.
 */

/*
1. Log into compass.com
2. As a logged in user, perform a rental search and a for-sale search with a two bedroom filter.
3. Confirm that all search results have two bedrooms and are of listingType = 2.
*/

import puppeteer from "puppeteer";

/*********************** Puppeteer/Jest Setup ******************************/
let page;
let browser;

//Set 'headless' to true to turn off browser UI, increase sloMo to slow down test execution.
beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        //slowMo: 10,
        args: [`--start-fullscreen`]
    });
    page = await browser.newPage();
    //dynamically set browser viewport to user's display resolution, else default to
    //MacBook Pro resolution
    const width = await page.evaluate("window.screen.availWidth") || 1440;
    const height = await page.evaluate("window.screen.availHeight") || 900;
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});
/***************************************************************************/

//Setup for tests
import { login } from "../fixtures/login";
import * as homepage from "../page-objects/homepage";
import * as signInModal from "../page-objects/partials/modals/sign-in-modal";
import * as salesSearchResult from '../page-objects/search-results/sales-search-result-page';
import * as rentalSearchResult from '../page-objects/search-results/rental-search-result-page';
import * as helper from "../page-objects/helper";
import { cities, bedrooms } from "../fixtures/search-parameters"

const listingTypeRegEx = /"listingType":\d+/g;

describe("Logs into the homepage and searches for 2-bedroom sales and rental listings", () => {
    test("Logs into homepage", async () => {
        const header = homepage.header;
        // Wait until network activity has fully ceased to determine page has loaded
        await page.goto(homepage.URI, {waitUntil: "networkidle0"});
        await page.waitForSelector(homepage.selectors.searchInput);
        await page.click(header.selectors.loggedOut.loginButton);
        await page.waitForSelector(signInModal.selectors.dialog);
        await page.type(signInModal.selectors.textFields.email, login.email);
        await page.type(signInModal.selectors.textFields.password, login.password);
        await page.click(signInModal.selectors.loginButton);
        await page.waitForSelector(header.selectors.loggedIn.userMenu);
    }, 20000);

    test("Loads sales search results page and verifies listings are 2-bed and of listingType=2", async () => {
        // Manually load search page with relevant params instead of manually clicking/navigating
        const query = cities.nyc + "/?" + bedrooms["2-bed"];
        await page.goto(salesSearchResult.URI + query, {waitUntil: "networkidle0"});
        // Gets an array of all listed apartment sizes on the page
        const listingBedrooms = await helper.getAllInnerText(page, salesSearchResult.searchBasePageSelectors.numberBedrooms);
        let listingProperties = await helper.getInnerText(page, salesSearchResult.searchBasePageSelectors.globalScriptObject);
        const listingType = listingProperties.match(listingTypeRegEx)[0];
        // Loop through the text of each listing and assert each matches 2-bedroom
        for (let listing of listingBedrooms) {
            expect(listing).toBe("2 BD");
        }
        // This could also be done by calling baseSearchPageResults.formatScriptTag but a match
        // seems more efficient than several regex iterations followed by property lookup.
        expect(listingType).toContain("2");
    }, 20000);

    test("Loads rental search results page and verifies listings are 2-bed and of listingType=0", async () => {
        const query = cities.san_fransisco + "/?" + bedrooms["2-bed"];
        await page.goto(rentalSearchResult.URI + query, {waitUntil: "networkidle0"});
        const listingBedrooms = await helper.getAllInnerText(page, rentalSearchResult.searchBasePageSelectors.numberBedrooms);
        let listingProperties = await helper.getInnerText(page, salesSearchResult.searchBasePageSelectors.globalScriptObject);
        const listingType = listingProperties.match(listingTypeRegEx)[0];

        for (let listing of listingBedrooms) {
            expect(listing).toBe("2 BD");
        }
        expect(listingType).toContain("0");
    }, 20000);
});
