const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    send.json({"result": "ok"});
});

module.exports = router;