const express = require('express');
const router = express.Router();

router.use('/metrics', require('./metrics'));
router.use('/metrics/performance', require('./metrics/performance'));

router.get('/', (req, res) => {
    res.json({"result": "ok"});
});

module.exports = router;