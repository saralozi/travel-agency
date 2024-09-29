const express = require('express');
const signupModel = require('../models/signup');
const app = express();
const jwt = require('jsonwebtoken');
const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


app.post('/login', async (req, res) => {
    const userData = req.body;
    const findUser = await signupModel.findOne({ email: userData.email }).exec();
    try {
        if (findUser) {
            const passOk = bcrypt.compareSync(userData.password, findUser.password);
            if (passOk) {
                jwt.sign({ email: findUser.email, id: findUser._id }, secret, {}, (err, token) => {
                    if (err) {
                        console.error('Error generating token:', err);
                        res.status(500).send("Something is wrong");
                    } else {
                        console.log('Generated token:', token);
                        res.cookie('token', token, { httpOnly: true }).json({
                            id: findUser._id,
                            email: findUser.email,
                            username: findUser.username,
                        });
                    }
                });
            } else {
                res.status(400).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send("Something is wrong " + err);
    }
});


app.get('/user', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, decoded) => {
        if (err) {
            console.log('Unauthorized');
            return res.status(401).send('Unauthorized');
        }

        try {
            const user = await signupModel.findById(decoded.id);
            if (user) {
              
                res.json({ id: user._id, email: user.email, role: user.role || 'user' });
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});


app.post('/logout', (req, res) => {
    console.log('Logout request received');
    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
});



module.exports = app