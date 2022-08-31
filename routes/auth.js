const { Router } = require('express');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/validate-jwt');

// Auth

const router = Router();

router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
    fieldValidators
] ,loginUser);

router.get('/new', [
// middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password length should be at least 6 characters').isLength({min: 6}),
    fieldValidators

],  createUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
