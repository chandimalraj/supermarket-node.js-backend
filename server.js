const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

//create instance of an express 
const app = express()

//add cors middleware ---Cross Origin Resource Sharing
app.use(cors())

//add body-paser middleware----- convert incomming request body into json format
app.use(bodyParser.json())

//backend running port
const PORT = process.env.PORT || 8050 ;
const URI = process.env.MONGODB_URI

mongoose.set('strictQuery', false);
mongoose.connect(URI,{
                    
    useNewUrlParser: true,
    useUnifiedTopology: true
    
     })

const connection = mongoose.connection;

//listen for a single occurrence of an event on a Mongoose connection
connection.once("open",()=>{console.log("mongodb connection success")})   


//customer router
const customerRouter = require("./routes/customerRoute.js")

//set path to customer router
app.use("/api/v1/customer",customerRouter);



//start the server for incomming requests
app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`)
})



