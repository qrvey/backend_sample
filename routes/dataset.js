var express = require('express');
var router = express.Router();

/* GET dataset listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET get dataset. */
router.get('/:datasetId', function (req, res, next) {
    res.send('respond with a resource');
});

/* POST Create dataset. */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT Update dataset. */
router.put('/:datasetId', function (req, res, next) {
    res.send('respond with a resource');
});

/* DELETE Delete dataset. */
router.delete('/:datasetId', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
