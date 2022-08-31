const { response } = require('express');

const fieldValidators = (req, res = response, next) => {
    // next se llama si todo el middleware se ejecuta directamente, pasa al sig, middleware

    // manejo de errores

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ 
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    fieldValidators 
}