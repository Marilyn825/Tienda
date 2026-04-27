const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swagger');

const app = express(); //levanto la app (genero un objeto app)

//cargo los módulos particulares de la aplicación
const CPU = require('./routes/cpu');
const GPU = require('./routes/gpu');
const RAM = require('./routes/ram');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta raíz - mensaje de bienvenida
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la Tienda de PCs Custom' });
});

/* endpoints */
app.use('/cpus', CPU);
app.use('/gpus', GPU);
app.use('/rams', RAM);

//para que la app funcione importo el módulo app en server.js
module.exports = app;