const mongoose = require('mongoose');
const CONFIG = require('./config');

module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) return this.connection;
        return mongoose.connect(CONFIG.DB)
            .then(connection => {
                this.connection = connection;
                console.log('Conexión a MongoDB Atlas exitosa');
            })
            .catch(err => console.log(err))
    }
}