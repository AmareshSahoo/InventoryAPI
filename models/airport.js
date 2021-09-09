
const mongoose = require('mongoose');

const AirportSchema = new mongoose.Schema({
    airport_name: {
        type: String,
        unique: true,
        required: [true, 'Please add airport name'],
    },
    fuel_capacity: {
        type: Number,
        unique: true,
        required: [true, 'Please add fuel_capacity']
    },
    fuel_available: {
        type: Number,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Airport', AirportSchema);
