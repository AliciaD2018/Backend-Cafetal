const { Schema, model } = require("mongoose");

const admiSchema =Schema({
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


module.exports=model('Admi',admiSchema);
