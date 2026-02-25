const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const authenticateUser = require("../middleware/authentication");

const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.route("/").get(getAllBooks).post(createBook);

// GET logged-in user's books
router.get("/user", async (req, res) => {
  try {
    const books = await Book.find({
      createdBy: req.user.userId,
    })
      .populate("createdBy", "username profileImage")
      .sort("-createdAt");

    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
