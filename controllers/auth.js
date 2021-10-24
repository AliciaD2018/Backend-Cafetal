const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {

    const { cedula, edad, nombre } = req.body;
    console.log(cedula, edad, nombre);

    try {
        //Verificar la cedula o Pin que no exista
        const usuario = await Usuario.findOne({ cedula });
        if (usuario) {
            return res.status(400).json({
                ok: true,
                msg: 'El usuario ya existe'
            })
        }

        //Crear usuario con el modelo
        const dbUsuario = new Usuario(req.body);

        //Genera el Jwt

        //Crear el Usaurio de BD
        await dbUsuario.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid:dbUsuario.id,
            nombre
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Hablar con el Administrador'
        });
    }


}

const loginUsuario = (req, res = response) => {

    const { cedula } = req.body;
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


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}