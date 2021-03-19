const firebase = require("firebase");

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAZ3IXyz6_ALJfUaQRQGRVT-szNGHTexbg",
    authDomain: "daily-focus-a7423.firebaseapp.com",
    databaseURL: "https://daily-focus-a7423-default-rtdb.firebaseio.com",
    projectId: "daily-focus-a7423",
    storageBucket: "daily-focus-a7423.appspot.com",
    messagingSenderId: "30654869758",
    appId: "1:30654869758:web:d4041638ea4bd76c8a35af",
    measurementId: "G-HFNWF4DM71",
});

const database = firebaseApp.database();

module.exports = { database };
