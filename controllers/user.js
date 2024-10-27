const User = require("../models/user");

module.exports.renderSignUpFrom = (req, res) => {
    res.render("users/signup.ejs")
};

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new User({
            email: email,
            username: username,
            password: password
        });
        const registerUser = await User.register(newuser, password)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginFrom = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logout successfully!");
        res.redirect("/listings");
    });
};