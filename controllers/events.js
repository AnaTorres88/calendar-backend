
const { response } = require('express');
const Evento = require('../models/Event');

const getEvent = async(req, res = response) => {
    const eventos = await Evento.find().populate('user', 'name');

    res.status(200).send({
        ok: true,
        msg: eventos
    });
};
   

const createEvent = async (req, res = response) => {
    // verificar que tenga el evento
    const evento = new Evento(req.body);
    
    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            msg: eventoGuardado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact admin'
        })
    }
    
};
   

const updateEvent = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento) {
            res.status(404).json({
                ok: false,
                msg: 'Event with that Id does not exist'
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized. Edition priviledge does not exist'
            })
        }
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

    const eventoActualizado = 
    await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true}); // 3er arg para regresar dato actualizado

        res.json({
            ok: true, 
            evento: eventoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
};
   

const deleteEvent = async(req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento) {
            res.status(404).json({
                ok: false,
                msg: 'Event with that Id does not exist'
            })
        }

        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized. Edition priviledge does not exist'
            })
        }

        await Evento.findByIdAndDelete(eventoId); // 3er arg para regresar dato actualizado

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the anministrator'
        });
    }
};

   
module.exports = {
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
}