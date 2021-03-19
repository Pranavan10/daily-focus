var admin = require("firebase-admin");
admin.initializeApp({
    projectId: "daily-focus-a7423",
});
function authorise(request, response, next) {
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
        idToken = request.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No bearer token found");
        return response.status(401).json({ error: "Unauthorized access" });
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            return next();
        })
        .catch((err) => {
            console.error("Error while attempting to verifying token", err);
            return response.status(401).json(err);
        });
}
module.exports = authorise;
