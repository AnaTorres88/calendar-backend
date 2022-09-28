const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const auth =  require('./routes/auth');
const events =  require('./routes/events');

// variables y procesos
// console.log(process.env) 
// Crear el servidor de express

const app = express();

// Base de datos
dbConnection();

// cors
app.use(cors());
// Directorio publico

app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', auth);
app.use('/api/events', events);

// TODO: CRUD: Eventos

// Escuchar petición

app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});