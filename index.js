const express = require('express');
const cors = require('cors');
const { dbConection } = require('./database/config');
require( 'dotenv').config();
//const { dbConection } = require('./database/config')
//Crear el servidor de express


const app = express();

app.use(cors());
//Base de datos

dbConection();


//CORS
//app.use(cors())
//Directorio publico

app.use( express.static('public'));

//lectura y parseo del body
app.use( express.json())


//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});