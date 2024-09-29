const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const destinationModel = require("../models/destination");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, fileFilter });

app.post('/add', upload.single('photo'), async(req,res) => {
  try{
    const itemData = new destinationModel({
      ...req.body,
      photo: req.file.filename
    })
    await itemData.save()
    res.status(200).send(itemData)
  }catch(err){
    console.log(err)
    res.status(500).send("Message"+err)
  }
})

app.get('/destination', async(req,res) => {
  try{
    const allItem = await destinationModel.find({})
    res.status(200).send(allItem)
  }catch(err){
    console.log(err)
    res.status(500).send("Data not read."+err)
  }
})

app.get('/readOne/:id', async(req,res) =>{
  try{
    const itemId = req.params.id
    const itemData = await destinationModel.findById({_id:itemId})
    console.log(itemData)
    res.status(200).send(itemData)
  }catch (err){
    console.log(err)
    res.status(500).send("Data one not read"+err)
  }
})


app.delete('/delete/:id', async(req,res) =>{
  try{
    const itemId = req.params.id
    await destinationModel.deleteOne({_id:itemId})
    console.log("Deleted Item")
    res.status(200).send("Deleted item")
  
  }catch (err){
    console.log(err)
    res.status(500).send("Item not deleted"+err)
  }
})


app.patch("/update/:id", upload.single("photo"), async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemInfo = {...req.body}

    if (req.file) {
      itemInfo.photo = req.file.filename;
    }
    const itemUpdated =  await destinationModel.findByIdAndUpdate({ _id: itemId }, {$set:itemInfo}, {new:true})

    console.log(itemUpdated);
    res.status(200).send(itemUpdated);
  } catch (err) {
    console.log(err);
    res.status(500).send("Message" + err);
  }
});



module.exports = app;