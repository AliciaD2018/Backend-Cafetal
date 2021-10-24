const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

//Crear un nuevo usuario
router.post('/register',
    [
        check('cedula', 'La cedula es obligatoria y deber ser < 12').isLength({ max: 12 }).not().isEmpty(),
        check('edad', 'La edad debe ser numerico').not().isEmpty().isNumeric(),
        check('nombre', 'El nombre es Obligatorio').not().isEmpty()
    ], crearUsuario);

//Login de usuario
router.post('/',
    [
        check('cedula', 'El largo de la cedula no es la correcta').isLength({ max: 12 })
    ],
    loginUsuario);


//Validar y revalidar Token
router.get('/renew', revalidarToken)

module.exports = router;