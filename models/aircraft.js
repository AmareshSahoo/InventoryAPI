
const mongoose = require('mongoose');

const AircraftSchema = new mongoose.Schema({
    aircraft_no: {
        type: Number,
        unique: true,
        required: [true, 'Please add aircraft_no'],
    },
    airline: {
        type: String,
        required: [true, 'Please add airline'],
        enums: ["IndiGo","Go Air", "Spice Jet", "Air India"]
    },
    source: {
        type: String,
        required: [true, 'Please add source']
    },
    destination: {
        type: String,
        required: [true, 'Please add source']
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Aircraft', AircraftSchema);