const {response}=require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = response) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }

    
    const{cedula, edad, nombre}=req.body;
    console.log(cedula,edad,nombre);

    return res.json({
        ok: true,
        msg: 'Register Complete'
    });
}

const loginUsuario = (req, res = response) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        });
    }


    const{cedula}=req.body;
    console.log(cedula);
    
    return res.json({
        ok: true,
        msg: 'Login ok2'
    });
}

const revalidarToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}


module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}