const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

///Son las redirecciones para que funcione el sistema

router.get('/login', LoginController.index);
router.get('/acerca', LoginController.acerca);
router.post('/registra', LoginController.storeUser);
router.post('/entrar', LoginController.auth)
router.get('/logout', LoginController.logout)

module.exports = router;