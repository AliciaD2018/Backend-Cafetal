const { Schema, model } = require("mongoose");

const UsuarioSchema =Schema({
    cedula:{
        type:String,
        required:true,
        unique:true
    },
    edad:{
        type:Number,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },


});

module.exports=model('Usuario',UsuarioSchema);