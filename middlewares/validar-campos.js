const {response} = require('express'); //estas importaciones es para el tipado
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next ) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next(); //es para que pase por todos los check cuando todo esta correcto
}

module.exports = {
    validarCampos
}