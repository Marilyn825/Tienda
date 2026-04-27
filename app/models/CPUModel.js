const mongoose = require('mongoose');

const CPUSchema = new mongoose.Schema({
    name:   { type: String, unique: true, required: true },
    brand:  { type: String, required: true, enum: ['Intel', 'AMD'] },
    price:  { type: Number, required: true },
    cores:  { type: Number, required: true },
    ghz:    { type: Number, required: true },
    socket: { type: String, required: true }
});

const CPU = mongoose.model('CPU', CPUSchema);
module.exports = CPU;