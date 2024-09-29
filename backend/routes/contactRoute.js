const express = require('express');
const contactModel = require('../models/contact');
const app = express();

app.post('/contact', async(req, res) => {
    try{
        const contactData = new contactModel(req.body) 
        await contactData.save() 
        console.log(contactData)
        res.status(200).send(contactData)
    }catch (err) {
        console.log(err)
        res.status(500).send("Message"+err)
    }
})


module.exports = app