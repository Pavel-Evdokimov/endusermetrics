const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.json({ result: "performance ok" });
});

module.exports = router;
