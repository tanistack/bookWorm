require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

const authenticateUser = require("./middleware/authentication");
const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

//dbconnection
const dbConnection = require("./db/connect");


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

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", authenticateUser, booksRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async ()=>{
    await dbConnection();

    try {
        app.listen(port, ()=>{
        console.log(`Server up and running and listening on ${port}`)
    });

    } catch (error) {
       console.log(`Server error, ${error}`); 
    }
}

start();
