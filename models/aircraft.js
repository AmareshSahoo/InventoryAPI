
const mongoose = require('mongoose');

const AircraftSchema = new mongoose.Schema({
    aircraft_no: {
        type: String,
        unique: true,
        required: [true, 'Please add aircraft_no'],
    },
    airline: {
        type: String,
        required: [true, 'Please add airline']
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