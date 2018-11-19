const express = require("express");
const router = express.Router();
const nano = require("nano")("http://localhost:5984");
const csui_performance_db = nano.db.use("csui_performance");

router.post("/", (req, res) => {
    let post = JSON.parse(req.body);
    // TODO: promise use should you. By Master Yoda.
    // TODO: how handle errors?
    csui_performance_db.insert(post, (err, documentInsertResponse, header) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        res.send(documentInsertResponse.ok);
    });
});

module.exports = router;
