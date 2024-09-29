const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    tour: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
   
   
   
});

const Booking = mongoose.model("Booking", bookingSchema)
module.exports = Booking