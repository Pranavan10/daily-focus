var admin = require("firebase-admin");
admin.initializeApp({
    projectId: "daily-focus-a7423",
});
function authorise(req) {
    return new Promise((resolve, reject) => {
        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            idToken = req.headers.authorization.split("Bearer ")[1];
        } else {
            resolve("");
        }

        admin
            .auth()
            .verifyIdToken(idToken)
            .then((token) => {
                const UUID = token.user_id;
                resolve(UUID);
            })
            .catch((err) => {
                resolve("");
            });
    });
}
module.exports = authorise;
