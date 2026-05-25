// dot env 
require("dotenv").config();
//express 
const express =require("express");
const app = express();
//middleware
app.use (express.json()) 
//port
const port = process.env.PORT || 5000;
//DB connection
const mongoose = require("mongoose")
async function DBconnection() {
    try {
     await   mongoose.connect(process.env.DB_URL)
        console.log("connected");
        
    } catch (error) {
        console.log(error);
        
    }
}

const authRoutes = require("./routes/authRoutes")
const noteRoutes = require("./routes/noteRoutes")
const userRoutes = require("./routes/userRoutes")
app.use ("/api",authRoutes)
app.use ("/api", noteRoutes)
app.use ("/api" , userRoutes)
DBconnection();

const errorMiddleware =require("./middleware/errorMiddleware")
app.use(errorMiddleware)
//run server 
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})
