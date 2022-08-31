/* Event routes*/
// /api/events


// Obtener eventos

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { fieldValidators } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/events');

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

// Get event
router.get('/', getEvent);
// Create event
router.post('/',
[
    check('title', 'title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate), // custom espera callback
    check('end', 'End date is required').custom(isDate), // custom espera callback
    fieldValidators
]
,createEvent);
// Update event
router.put('/:id', updateEvent);

// Update event
router.delete('/:id', deleteEvent);

module.exports = router;