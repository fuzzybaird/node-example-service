const router = require('express').Router();
router.get('/hello', require('./hello.controller'));

router.get('/xkcd', require('./xkcd.controller'));

router.all('*', (req, res, next) => {
    let error = new Error(`No matching route found: ${req.path}`);
    error.statusCode = 400;
    next(error);
});
module.exports = router;
