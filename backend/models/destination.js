const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
 
});

const Destination = mongoose.model("Destination", destinationSchema)
module.exports = Destination