const express = require('express');
const connctionController = require('../controllers/connectionController');
const router = express.Router();

/* GET connection listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET get connection. */
router.get('/:connectionId', function (req, res, next) {
    res.send('respond with a resource');
});

/* POST get connections. */
router.post('/all', connctionController);

/* POST Create connection. */
router.post('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT Update connection. */
router.put('/:connectionId', function (req, res, next) {
    res.send('respond with a resource');
});

/* DELETE Delete connection. */
router.delete('/:connectionId', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
