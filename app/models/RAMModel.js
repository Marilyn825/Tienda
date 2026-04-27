const mongoose = require('mongoose');

const RAMSchema = new mongoose.Schema({
    name:     { type: String, unique: true, required: true },
    brand:    { type: String, required: true },
    price:    { type: Number, required: true },
    capacity: { type: Number, required: true },
    speed:    { type: Number, required: true },
    type:     { type: String, required: true, enum: ['DDR4', 'DDR5'] }
});

const RAM = mongoose.model('RAM', RAMSchema);
module.exports = RAM;