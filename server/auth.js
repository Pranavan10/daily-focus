var admin = require("firebase-admin");
admin.initializeApp({
    apiKey: "AIzaSyAZ3IXyz6_ALJfUaQRQGRVT-szNGHTexbg",
    authDomain: "daily-focus-a7423.firebaseapp.com",
    databaseURL: "https://daily-focus-a7423-default-rtdb.firebaseio.com",
    projectId: "daily-focus-a7423",
    storageBucket: "daily-focus-a7423.appspot.com",
    messagingSenderId: "30654869758",
    appId: "1:30654869758:web:d4041638ea4bd76c8a35af",
    measurementId: "G-HFNWF4DM71",
});
function authorise(request, response, next) {
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer ")) {
        idToken = request.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No token found");
        return response.status(401).json({ error: "Unauthorized" });
    }
    admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            request.user = decodedToken;
            return next();
        })
        .catch((err) => {
            console.error("Error while verifying token", err);
            return response.status(401).json(err);
        });
}
module.exports = authorise;
