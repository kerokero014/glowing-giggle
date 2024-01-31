const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'));
//swagger
router.use('/', require('./swagger'));

module.exports = router;
