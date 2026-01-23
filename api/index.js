const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.MONGODB_URI
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect(mongoURI).then(() => {
    console.log("Connected to MongoDb")
}).catch((error) => {
    console.log("Error in connecting to MongoDB", error)
})

app.listen(port, () => {
    console.log("Server running on port 3000")
})