const Listing = require("../models/listing");
const {Client} = require("@googlemaps/google-maps-services-js");

//Index Home Route
module.exports.index = async (req, res) => {
    let allListing = await Listing.find();
    res.render("listings/index.ejs", { allListing });
};

//Show Route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing });
};

//Edit Route
module.exports.renderEditFrom = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exists!");
        res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/h_200,w_250");
    res.render("listings/edit.ejs", { listing , originalImage});
};

//Update Route
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listings updated!");
    res.redirect(`/listings/${id}`);
};

//Add Route [GET]
module.exports.renderNewFrom = (req, res) => {
    res.render("listings/new.ejs");
};

//Add Route [POST]
module.exports.createListing = async (req, res) => {
    const url = req.file.path;
    const filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New listings created!");
    res.redirect("/listings");
};

//Delete Route
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listings Deleted!");
    res.redirect("/listings");
};