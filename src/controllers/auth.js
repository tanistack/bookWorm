const express = require("express");
const mongoose = require("mongoose");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, UnauthenticatedError} = require("../errors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT(); // ← CALL the function

  res.status(StatusCodes.CREATED).json({
    user: { username: user.username },
    token: token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  //compare passwords
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // create login token
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { username: user.username }, token })
}

module.exports = {
    register,
    login
}

