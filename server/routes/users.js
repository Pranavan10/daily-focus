var express = require("express");
var usersRouter = express.Router();
const firebase = require("firebase");

/* GET users listing. */
usersRouter.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

//Added login functionality to obtain token to access user id for database items
function login(req, res) {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    //checks if matching email and password exist on firebase servers
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
            console.error(err);
            return res.status(401).json({ Message: "Either your email or password is incorrect" });
        });
}

module.exports = {
    usersRouter,
    login,
};
