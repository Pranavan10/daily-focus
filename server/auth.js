var admin = require("firebase-admin");
admin.initializeApp({
    projectId: "daily-focus-a7423",
});
function authorise(res, res, next) {
    let idToken;
    if (res.headers.authorization && res.headers.authorization.startsWith("Bearer ")) {
        idToken = res.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No bearer token found");
        return res.status(401).json({ error: "Unauthorized access" });
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((token) => {
            return next();
        })
        .catch((err) => {
            console.error("Error while attempting to verifying token", err);
            return res.status(401).json(err);
        });
}
module.exports = authorise;
