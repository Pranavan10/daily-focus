var express = require("express");
var router = express.Router();

/* GET all todo list entries */
router.get("/", function (req, res, next) {
    // TODO implementation for getting entries

    res.send("get all todo entries"); // TODO change response after
});

/* POST new todo entry */
router.post("/", function (req, res, next) {
    // TODO implementation for adding new entry to database

    res.send("post new entry to database"); // TODO change response after
});

/* PUT entry update */
router.put("/", function (req, res, next) {
    // TODO implementation for updating entry in database

    res.send("put entry update into database"); // TODO change response after
});

/* DELETE todo list entry*/
router.delete("/", function (req, res, next) {
    // TODO implementation deleting entry from our database

    res.send("delete todo list entry"); // TODO change response after
});

module.exports = router;
