var admin = require("firebase-admin");
admin.initializeApp({
    projectId: "daily-focus-a7423",
});
async function authorise(req) {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        return "";
    }

    await admin
        .auth()
        .verifyIdToken(idToken)
        .then((token) => {
            const UUID = token.user_id;
            console.log(UUID);
            return UUID;
        })
        .catch((err) => {
            return "";
        });
}
module.exports = authorise;
