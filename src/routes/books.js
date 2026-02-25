const express = require("express");
const router = express.Router();
const Book = require("../routes/books");
const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/books");

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

router.get("/user", async (req, res) => {
  try {
    // ✅ req.user comes from JWT
    const books = await Book.find({ user: req.user })
      .sort({ createdAt: -1 })
      .populate("createdBy", "username profileImage")
      .sort("-createdAt");

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
