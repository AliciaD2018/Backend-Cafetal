const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const Admi = require('../models/Admi');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//pin = getRndInteger(1000, 10000);


const crearUsuario = async (req, res = response) => {

    const { cedula, edad, nombre, telefono, telefonoEmergencia, fechaIngreso, genero } = req.body;
    //console.log(cedula, edad, nombre, telefono, telefonoEmergencia, fechaIngreso, genero);

    try {
        var cont = 0;
        var codigo = '';
        while (cont < 3) {
            codigo = 'T-' + getRndInteger(1000, 10000);;
            //Verificar la cedula o Pin que no exista
            const usuario = await Usuario.findOne({ codigo });
            if (usuario != null) {
                break;
            }
            cont = cont + 1
        }
        var nuevo = { cedula, edad, nombre, telefono, telefonoEmergencia, fechaIngreso, genero, codigo }

        //Crear usuario con el modelo
        const dbUsuario = new Usuario(nuevo);

        //hash de la contraseña
        //const salt = bcrypt.genSaltSync();//cantidad de vueltas le podemos mandar
        //dbUsuario.contrasena = bcrypt.hashSync(contrasena, salt)

        //Genera el Jwt
        const token = await generarJWT(dbUsuario.id, nombre);

        //Crear el Usaurio de BD
        await dbUsuario.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUsuario.id,
            nombre,
            codigo,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Hablar con el Administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {

    const { codigo } = req.body;
    console.log(codigo);

    try {
        const dbUsuario = await Usuario.findOne({ codigo });

        if (!dbUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe - Revise su Pin o comunicarse con el Administrador '
            });
        }

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUsuario.id,
            usuario: dbUsuario.usuario,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administradorPrincipal'
        });

    }
}

const revalidarToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}

//-------------------------------------------------------------


const loginAdministrador = async (req, res = response) => {

    const { usuario, contrasena } = req.body;
    console.log(usuario, contrasena);

    try {
        const dbAdmi = await Admi.findOne({ usuario });

        if (!dbAdmi) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(contrasena, dbAdmi.contrasena);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contrasena no es válido'
            });
        }


        // Generar el JWT
        const token = await generarJWT(dbAdmi.id, dbAdmi.nombre);

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbAdmi.id,
            usuario: dbAdmi.usuario,
            token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administradorPrincipal'
        });

    }

}

const crearAdmi = async (req, res = response) => {

    const { usuario, contrasena, nombre} = req.body;

    try {
        
        //Verificar la cedula o Pin que no exista
        const admin = await Admi.findOne({ usuario });

        if ( admin ) {
            return res.status(400).json({
                ok: false,
                msg: 'El administrador ya existe con ese usuario'
            });
        }
        //Crear usuario con el modelo
        const dbAdmi = new Admi(req.body);

        //hash de la contraseña
        const salt = bcrypt.genSaltSync();//cantidad de vueltas le podemos mandar
        dbAdmi.contrasena = bcrypt.hashSync(contrasena, salt)

        //Genera el Jwt
        const token = await generarJWT(dbAdmi.id, nombre);

        //Crear el Usaurio de BD
        await dbAdmi.save();

        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbAdmi.id,
            nombre:dbAdmi.nombre,
            token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: 'Hablar con el Administrador'
        });
    }
}





module.exports = {
    crearUsuario,
    loginUsuario,
    loginAdministrador,
    crearAdmi,
    revalidarToken
}