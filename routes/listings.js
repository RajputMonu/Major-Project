const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { showListing, renderNewFrom, createListing, renderEditFrom, updateListing, destroyListing, index } = require("../controllers/listings.js");
const { route } = require("./listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
    //Index Route
    .get(wrapAsync(index))
    //Add new route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(createListing));

//Add Route
router.get("/new", isLoggedIn, renderNewFrom);

router.route("/:id")
    //Show Route
    .get(wrapAsync(showListing))
    //Update route
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(updateListing))
    //Delete route
    .delete(isLoggedIn, isOwner, wrapAsync(destroyListing))


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditFrom));

module.exports = router;