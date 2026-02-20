const Book = require("../models/book");
const {StatusCodes} = require("http-status-codes");
const { BadRequestError, NotFoundError } = require('../errors')


const getAllBooks = async (req, res) => {
  const books = await Book.find({ createdBy: req.user.userId }).sort('-createdAt')
  const count = books.length;
  res.status(StatusCodes.OK).json({ books, count: count })
}

const getBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req

  const book = await Book.findOne({
    _id: bookId,
    createdBy: userId,
  })
  if (!book) {
    throw new NotFoundError(`No book with id ${bookId}`)
  }
  res.status(StatusCodes.OK).json({ book })
}

const createBook = async (req, res) => {
  const book = await Book.create({
    ...req.body,
    createdBy: req.user.userId,
  })

  res.status(StatusCodes.CREATED).json({ book })
}

const updateBook = async (req, res) => {
  const {
    body: { name,caption, rating },
    user: { userId },
    params: { id: bookId },
  } = req

  if (name === '' || caption === '') {
    throw new BadRequestError('Book name and caption fields cannot be empty')
  }
  const book = await Book.findOneAndUpdate(
    { _id: bookId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!book) {
    throw new NotFoundError(`No book found with id ${bookId}`)
  }
  res.status(StatusCodes.OK).json({ book })
}

const deleteBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req

  const book = await Book.findOneAndDelete({
    _id: bookId,
    createdBy: userId,
  })
  
  if (!book) {
    throw new NotFoundError(`No book found with id ${bookId}`)
  }
  res.status(StatusCodes.OK).json({book})
}



module.exports = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}
