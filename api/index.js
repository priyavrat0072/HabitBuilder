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

const Habit = require('./models/habit')
// endpoints to create a habit in the backend

app.post("habits",async(req,res)=>{
    try{
        const {title,color,repeatMode,reminder} = req.body;
        const newHabit = new Habit({
            title,
            color,
            repeatMode,
            reminder
        })

        const savedHabit = await newHabit.save()
        res.status(200).json(savedHabit)
        
    }catch(error){
        res.status(500).json({error:'Network error'})
    }
})