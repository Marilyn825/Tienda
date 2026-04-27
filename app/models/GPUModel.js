const mongoose = require('mongoose');

const GPUSchema = new mongoose.Schema({
    name:   { type: String, unique: true, required: true },
    brand:  { type: String, required: true, enum: ['NVIDIA', 'AMD', 'Intel'] },
    price:  { type: Number, required: true },
    vram:   { type: Number, required: true },
    type:   { type: String, required: true, enum: ['Gaming', 'Workstation', 'Budget'] }
});

const GPU = mongoose.model('GPU', GPUSchema);
module.exports = GPU;