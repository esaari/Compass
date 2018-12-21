/**
 * Selectors and functions specific to page elements present on a
 * sales search results page.
 */

import * as basePage from "../base-page";
import * as searchBasePage from "./base-search-results";

const searchBasePageSelectors = searchBasePage.selectors;
const route = searchBasePage.route + "sales/";
const URI = basePage.BASE_URI + route;

const selectors = {

};

export { URI, selectors, searchBasePageSelectors }