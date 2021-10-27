const { Schema, model } = require("mongoose");

const UsuarioSchema =Schema({
    cedula:{
        type:String,
    },
    edad:{
        type:Number,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    telefonoEmergencia:{
        type:String,
    },
    fechaIngreso:{
        type:String,
        required:true
    },
    genero:{
        type:String,
    },
    codigo:{
        type:String,
        unique:true
    }
});

module.exports=model('Usuario',UsuarioSchema);
