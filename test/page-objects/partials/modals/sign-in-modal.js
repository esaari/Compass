/**
 * The sign-in modal containing email and password fields
 * @type {{dialog: string, textFields: {password: string, email: string}}}
 */

const selectors = {
    "dialog":           ".modal-dialog uc-login-form .uc-authenticationForm",
    "textFields": {
        "email":        ".modal-dialog uc-login-form .uc-authenticationForm fieldset [type=\"email\"]",
        "password":     ".modal-dialog uc-login-form .uc-authenticationForm fieldset [type=\"password\"]"
    },
    "loginButton":      ".modal-dialog uc-login-form .uc-authenticationForm .uc-authenticationForm-actions [type=\"submit\"]"
};

export { selectors }