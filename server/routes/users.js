var express = require("express");
var router = express.Router();
const validateLogin = require("./../validators");
const firebase = require("firebase");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

function login(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    //Valid
    const { valid, errors } = validateLogin(user);
    if (!valid) return res.status(400).json(errors);
    //
    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((err) => {
            console.err(err);
            return res.status(403).json({ Message: "Either your email or password is incorrect" });
        });
}

module.exports = {
    router,
    login,
};
