const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const CookieParser = require("cookie-parser")

//create instance of an express 
const app = express()

//add cors middleware ---Cross Origin Resource Sharing
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}))


//add body-paser middleware----- convert incomming request body into json format
app.use(bodyParser.json())

//add cookie parser
app.use(CookieParser())

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
const customerRouter = require("./routes/customerRoute.js");

//item route
const itemRouter = require("./routes/itemRoute.js")
 
//set path to customer router
app.use("/api/v1/customer",customerRouter);

//set path to item route
app.use("/api/v1/item",itemRouter)







// app.get('/setcookie', (req, res) => {
//     res.cookie(`Cookie token name`,`encrypted cookie string Value`);
//     res.send('Cookie have been saved successfully');
// });


//start the server for incomming requests
app.listen(PORT,()=>{
    
    console.log(`Server is up and running on port ${PORT}`)

})



