const express = require('express');
const router = express.Router();

router.use('/metrics', require('./metrics'));
router.use('/metrics/performance', require('./metrics/performance'));
router.use('/metrics/errors', require('./metrics/errors'));

router.get('/', (req, res) => {
    res.json({"result": "index ok"});
});

module.exports = router;