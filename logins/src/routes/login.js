const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.index);
router.get('/acerca', LoginController.acerca);
router.post('/registra', LoginController.storeUser);
router.post('/entrar', LoginController.auth)

module.exports = router;