const express = require("express");
const mongoose = require("mongoose");
const {StatusCodes} = require("http-status-codes");



const getAllBooks = async (req,res,next)=>{
    res.status(StatusCodes.OK).send("All Books Route");
}

const getBook = async (req,res,next)=>{
    res.status(StatusCodes.OK).send("Single Book Route");
}

const createBook = async (req,res,next)=>{
    res.status(StatusCodes.OK).send("Create Book Route");
}

const updateBook = async (req,res,next)=>{
    res.status(StatusCodes.OK).send("update Book Route");
}

const deleteBook = async (req,res,next)=>{
    res.status(StatusCodes.OK).send("delete Book Route");
}

module.exports = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}
