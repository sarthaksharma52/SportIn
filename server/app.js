require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
let port = process.env.PORT || 3000;

const userroutes = require("./routes/user");

mongoose.connect(process.env.MONGO_URL)
    .then(()=> {console.log("mongodbConnected"); })
    .catch((error)=>{console.log('mongodb connerction error :',error); });

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});