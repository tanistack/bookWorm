const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "The book title is required"],
      unique: true,
      trim: true,
    },

    caption: {
      type: String,
      required: [true, "The book caption is required"],
    },
    rating: {
      type: String,
      min: 1,
      max: 5,
    },

    image: {
      type: String,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please login or sign up to continue"],
    },
  },

  { timestamps: true },
);

// unique per user, not globally
BookSchema.index({ title: 1, createdBy: 1 }, { unique: true });

module.exports = mongoose.model("Book", BookSchema);
