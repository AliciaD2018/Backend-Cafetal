//sirve para la validación de usuarios
//instalación npm i j

const jwt = require('jsonwebtoken');


const generarJWT = ( uid, nombre ) => {

    const payload = { uid, nombre };
    
    //Permite que se pueda llamar
    return new Promise( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, { //la llave secreta
            expiresIn: '24h' //tiempo que va ser valido
        }, (err, token) => {
    
            if ( err ) {
                // TODO MAL
                console.log(err);
                reject(err);
    
            } else {
                // TODO BIEN
                resolve( token )
            }
    
        })
    });
}


module.exports = {
    generarJWT
}
