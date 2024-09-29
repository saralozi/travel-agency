const express = require('express');
const Booking = require('../models/booking');
const app = express();

app.post('/booking', async (req, res) => {
    try {
        const bookData = new Booking(req.body)
        await bookData.save()
        console.log(bookData)
        res.status(200).send(bookData)
    } catch (err) {
        console.log(err)
        res.status(500).send("Message" + err)
    }
})




module.exports = app