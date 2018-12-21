/**
 * Mapping file for parameters for search queries
 * @type {{boston: string, san_fransisco: string, washingtonDC: string, nyc: string, westchester: string}}
 */


const cities = {
    "nyc":                  "nyc",
    "washingtonDC":         "dc",
    "boston":               "boston",
    "westchester":          "westchester_ny",
    "san_fransisco":        "sf"
};

const bedrooms = {
    "studio":               "bedrooms=0",
    "alcoveStudio":         "bedrooms=0.5",
    "1-bed":                "bedrooms=1",
    "2-bed":                "bedrooms=2",
    "3-bed":                "bedrooms=3",
    "4-bed":                "bedrooms=4",
    "5-bed+":               "bedrooms=5",
    "unknown":              "include_unknown_bedrooms=1"
};


export { cities, bedrooms }