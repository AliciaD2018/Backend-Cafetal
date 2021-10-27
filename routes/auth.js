const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken, loginAdministrador,crearAdmi } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Crear un nuevo usuario
router.post('/register',
    [
        check('cedula', 'La cedula es obligatoria y deber ser < 12').isLength({ max: 12 }),
        check('edad', 'La edad debe ser numerico').not().isEmpty().isNumeric(),
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearUsuario);

//Login de usuario
router.post('/',
    [
        check('cedula', 'El largo de la cedula no es la correcta').isLength({ max: 12 }),
        validarCampos
    ],
    loginUsuario);

//Login de administrador
router.post('/admi',
    [
        check('usuario', 'El usuario es Obligatorio').not().isEmpty(),
        check('contrasena', 'El largo de la cedula no es la correcta').not().isEmpty(),
        validarCampos
    ],
    loginAdministrador);

    //Crear un nuevo admi
router.post('/registerAdmi',
[
    check('usuario', 'El usuario es Obligatorio').not().isEmpty(),
    check('contrasena', 'La contrasena es Obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
    validarCampos
],
crearAdmi);

//Validar y revalidar Token
router.get('/renew', revalidarToken)

module.exports = router;