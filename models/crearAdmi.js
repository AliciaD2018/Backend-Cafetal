const { Schema, model } = require("mongoose");

const crearAdmiSchema =Schema({
    usuario:{
        type:String,
    },
    contrasena:{
        type:String,
    },
    nombre:{
        type:String,
    },
});


module.exports=model('crearAdmi',crearAdmiSchema);