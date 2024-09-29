const express = require('express');
const signupModel = require('../models/signup');
const app = express();
const jwt = require('jsonwebtoken');
const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

app.post('/signup', async (req, res) => {
    const userInfo = req.body
    try {
        if (userInfo.name == " " && userInfo.email == "" & userInfo.password == "") {
            return (
                res.status(404).send("Field are empty")
            )
        }
        if (userInfo.password < 3) {
            return (
                res.status(404).send("Short password")
            )
        }
       
        let foundUser = await signupModel.findOne({ email: userInfo.email }).exec()
       
        if (foundUser) {
           
            return res.status(400).send("This user exist")
        } else {
           
            let newUser = new signupModel({
                name: userInfo.name,
                email: userInfo.email,
                password: bcrypt.hashSync(userInfo.password, salt),
                role: 'user' 

            })
            console.log(newUser)
           
            await newUser.save()
            return res.status(200).send('User Created ' + newUser)
        }
    } catch (err) {
        console.log('Something is wrong ' + err)
        res.status(500).send('Something is wrong ' + err)
    }
})


module.exports = app