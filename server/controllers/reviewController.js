const Review = require("../model/ReviewModel");

exports.addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    const review = new Review({
      userId: req.user.id, // Set from token, not request body
      bookId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    res.status(400).json({ message: "Review creation failed", error: error.message });
  }
}

exports.getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find()
        .select("bookId rating comment userId createdAt")
        .populate("bookId", "title")
        .populate("userId", "name email");

        res.status(200).json({
          msg: "All reviews fetched successfully",
          reviews,
        });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching reviews",
      error: error.message
    });
  }
};
