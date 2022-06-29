const { Router } = require("express");
const UsuarioController = require('../controllers/UsuarioController')
const router = Router();
const passport = require('passport')
const middlewares = require("../middlewares/middlewaresAutenticacao")
router.post('/usuario/login',middlewares.local,UsuarioController.login)

module.exports = router