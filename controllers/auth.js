// funciones que van en auth routes
const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    const { email, password } = req.body;
    // solo se puede dar una respuesta 1 unica vez
    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user with that email already exists'
            })
        }

        user = new User (req.body);

        // encryptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // user.save regresa una Promise
        await user.save(); 

        // Generar JWT: promise
        const token = await generateJWT(user.id, user.name);

        // Promise regresa usuario grabado o error
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Please inform the administrator'
        });
    }
   
};


const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user with that email does not exist'
            });
        }
        // confirmar passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            })
        }

        // Generar JWT: promise
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token

        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please inform the administrator'
        });
    }
};


const revalidateToken = async(req, res = response) => {

    const { uid, name } = req;
    // generar un jwt y retornarlo en esta petición d

    // Generar JWT: promise
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid, 
        name
    });
};

module.exports  = { createUser, loginUser, revalidateToken };