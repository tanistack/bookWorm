const express = require("express");
const mongoose = require("mongoose");
const {StatusCodes} = require("http-status-codes");


const register = async(req,res,next)=>{
    res.status(StatusCodes.OK).send("Register Route");
}

const login = async(req,res,next)=>{
    res.status(StatusCodes.OK).send("login Route");
}

module.exports = {
    register,
    login
}

