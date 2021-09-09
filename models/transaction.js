const mongoose = require('mongoose');
const Airport = require('../models/airport');


const TransactionSchema = new mongoose.Schema({
    transaction_date_time: {
        type : Date, 
        default: Date.now,
    },
    transaction_type: {
        type: String,
        required: [true, 'Please add transaction_type'],
        enums: ["IN","OUT"]
    },
    airport_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport',
        required: [true, 'Please add airport_id'],
    },
    aircraft_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft',
    },
    quantity: {
        type: Number,
        required: [true, 'Please add quantity']
    }
},
{
    timestamps: true,
});

// Static method to get avg of course tuitions
TransactionSchema.statics.calculateAvailableFuel = async function(airportId, quantity, transaction_type) {
    
    const obj = await Airport.aggregate([
        { $match: { _id: airportId } }
    ])
    
    try {
        if (obj[0]) {
            let fuil = null;
            if(transaction_type === "IN"){
                fuil = obj[0]['fuel_available'] + Math.abs(quantity)
            }else if(transaction_type === "OUT"){
                fuil = obj[0]['fuel_available'] - Math.abs(quantity)
            }
            
            await this.model("Airport").findByIdAndUpdate(airportId, {
                fuel_available: fuil != null ? fuil :  obj[0]['fuel_available']
            });
        } 
    } catch (err) {
        console.error("error at calculateAvailableFuel", err);
    }
};

// Call getAverageCost after save
TransactionSchema.post('save', async function() {
    await this.constructor.calculateAvailableFuel(this.airport_id,this.quantity, this.transaction_type);
});

module.exports = mongoose.model('Transaction', TransactionSchema);