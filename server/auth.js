var admin = require("firebase-admin");
admin.initializeApp({
    projectId: "daily-focus-a7423",
});
function authorise(req, res, next) {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((token) => {
            const UUID = token.user_id;
            return res.json({ UUID });
        })
        .catch((err) => {
            return res.status(401).json(err);
        });
}
module.exports = authorise;
