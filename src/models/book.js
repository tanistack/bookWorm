const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "The book name is required"]
    },

    caption:{
        type:String,
        required:[true, "The book caption is required"]
    },
    rating:{
        type:String,
    },

    image:{
        type:String,
    },

    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: [true, "Please login or sign up to continue"]
    }
}, 

{timestamps:true}

);

module.exports = mongoose.model("Book", BookSchema);