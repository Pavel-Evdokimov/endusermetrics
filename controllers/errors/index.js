const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({"result": "errors ok"});
});

module.exports = router;