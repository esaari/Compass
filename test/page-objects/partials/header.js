/**
 * The header that is persistent throughout the entire site
 * @type {{loggedOut: {loginButton: string, signUpButton: string}, loggedOutIn: {userMenu: string}}}
 */

const selectors = {
    "loggedOut": {
        "loginButton":  ".uc-globalHeader-rightContainer .uc-globalHeader-loggedOutMenu [data-tn=\"globalHeader-button-login\"]",
        "signUpButton": ".uc-globalHeader-rightContainer .uc-globalHeader-loggedOutMenu [data-tn=\"globalHeader-button-register\"]"
    },
    "loggedIn": {
        "userMenu":     ".uc-globalHeader-rightContainer .uc-globalHeader-userMenu .uc-globalHeader-navDropdownItemBtn"
    }
};

export { selectors }