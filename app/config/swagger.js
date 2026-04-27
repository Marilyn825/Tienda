const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tienda de PCs Custom API',
            version: '1.0.0',
            description: 'API para gestionar productos de PC'
        },
        servers: [{ url: 'http://localhost:5005' }]
    },
    apis: ['./app/routes/*.js']
};

module.exports = swaggerJsdoc(swaggerOptions);