const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReviews, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const { createReview, deleteReview } = require("../controllers/reviews.js");


//Reviews
//Post route
router.post("/", isLoggedIn, validateReviews, wrapAsync(createReview));

//Delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(deleteReview));


module.exports = router;