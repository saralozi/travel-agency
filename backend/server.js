const express = require('express'); 
const mongoose = require("mongoose")
const cors = require("cors")
const path = require('path')
const contactRoute = require('./routes/contactRoute')
const bookingRoute = require('./routes/bookingRoute')
const signupRoute = require('./routes/signupRoute')
const loginRoute = require('./routes/loginRoute')
const destinationRoute = require('./routes/destinationRoute')




const app = express()

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
  exposedHeaders: ["set-cookie"],
}))
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
  exposedHeaders: ["set-cookie"],
}))
  app.use(express.json({ limit: "1000mb", extended: true }));

mongoose.connect('mongodb+srv://saralozi:Mongo1116@cluster0.c2p9zej.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{console.log("DB connect")}).catch(err => {console.log(err)})

app.use(contactRoute)
app.use(bookingRoute)
app.use(signupRoute)
app.use(loginRoute)
app.use(destinationRoute)


app.get("/", (req,res) => {
    res.send("Hello");
})


app.listen(5000, () => {  
    console.log('Server Created!') 
})

