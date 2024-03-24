const express = require('express');
const router = express.Router();

const { keygen, proxy } = require('./openaiControllers');
const validateRequest = require('../middlewares/validateRequest');
const validateToken = require('../middlewares/validateToken');

router.post('/keygen', keygen);
router.use('/*', [validateToken, validateRequest], proxy);

module.exports = router;