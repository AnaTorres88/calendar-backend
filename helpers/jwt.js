// Crea el JWT
const jwt = require('jsonwebtoke');

// JWT trabaja con callbacks, necesitamos promises

const generateJWT = (uid, name) => {
    // Retornar promesa

    return new Promise((resolve, reject) => {
        // generar jwt
        
        const payload = { uid, name };
        // secret, palabra para saber si el token es el que generamos o no
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',

        }, (err, token) => { // callback, se va ajecutar cuando token se firma
           if (err) {
            console.log(err)
            reject('Token cannot be generated')
           }

           resolve(token);
        });
    });
};

module.exports = {
    generateJWT
}