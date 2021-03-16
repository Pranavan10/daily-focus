function isEmpty(text) {
    if (text.trim() === "") return true;
    else return false;
}

function validateLogin(data) {
    let err = {};
    if (isEmpty(data.email)) err.email = "Email cannot be empty";
    if (isEmpty(data.password)) err.password = "Password cannot be empty";
    return {
        err,
        valid: Object.keys(err).length === 0 ? true : false,
    };
}

module.exports = validateLogin;
