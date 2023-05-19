// env files
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });


const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

// DB connection
require("./db/conn");  

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//application routes
app.use("/", require("./routes/employee"));

//Port and server
app.listen(PORT, ()=>{
    console.log("App is running on http://localhost:" + PORT);
})
 
  