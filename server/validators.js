//This file is to check validity of inputs

//check if parameter is empty string
function isEmpty(text) {
    if (text.trim() === "") return true;
    else return false;
}
//check if email/password is empty
function emptyLogin(data) {
    let err = {};
    if (isEmpty(data.email)) err.email = "Email cannot be empty";
    if (isEmpty(data.password)) err.password = "Password cannot be empty";
    return {
        err,
        valid: Object.keys(err).length === 0 ? true : false,
    };
}

module.exports = emptyLogin;
