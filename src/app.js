require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

const authenticateUser = require("./middleware/authentication");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;


const app = express();
app.use(express.json());

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get("/", (req,res)=>{
    res.send("The Book Worm Leads");
});


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, ()=>{
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Server up and running on Port: ${port}`);
    });

    } catch (error) {
        console.log(`Something went wrong, ${error}`);
        process.exit(1);
    }
}

start();
