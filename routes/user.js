const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const { signupUser, renderSignUpFrom, renderLoginFrom, loginUser, logoutUser } = require("../controllers/user");
const { route } = require("./listings");

//Signup
router.route("/signup")
.get(renderSignUpFrom)
.post(wrapAsync(signupUser));

//Login
router.route("/login")
.get(renderLoginFrom)
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), loginUser);

//Logout
router.get("/logout", logoutUser);


module.exports = router;