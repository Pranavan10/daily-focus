var express = require("express");
var usersRouter = express.Router();
const firebase = require("firebase");
const database = require("./../firebase").database;

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
            return res.status(401).json({ message: "Either your email or password is incorrect" });
        });
}

function signup(req, res) {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    };

    let token, userId;

    firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idtoken) => {
            token = idtoken;
            //add user's email to real time database
            const user = {
                email: newUser.email,
            };

            return database.ref("/").update({
                [userId]: user,
            });
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            //send error response with message thrown by firebase
            return res.status(400).json({ message: err.message });
        });
}

module.exports = {
    usersRouter,
    login,
    signup,
};
