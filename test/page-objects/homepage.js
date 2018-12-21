/**
 * Main landing page for Compass customer website.
 */

import * as basePage from "./base-page"
import * as header from "../page-objects/partials/header"

const URI = basePage.BASE_URI;

const selectors = {
    "searchInput": ".legacyOmnibox .legacyOmnibox-input"
};

export { URI, header, selectors }
