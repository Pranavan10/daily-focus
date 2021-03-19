var admin = require("firebase-admin");
admin.initializeApp({
    projectId: "daily-focus-a7423",
});
function authorise(req, res, next) {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No bearer token found");
        return res.status(401).json({ error: "Unauthorized access" });
    }

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((token) => {
            const UUID = token.user_id;
            return res.json({ UUID });
        })
        .catch((err) => {
            console.error("Error while attempting to verifying token", err);
            return res.status(401).json(err);
        });
}
module.exports = authorise;
