const User=require("../models/user.js")

//render Signup
module.exports.renderSignupform = (req, res) => {
  res.render("Users/signup.ejs");
};

//signup
module.exports.signup = async (req, res,next) => {
  try {
    let { username, password, email } = req.body;
    let newUser = new User({ username, email });
    let registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Successfully signed up");
      res.redirect("/listing");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//render Login form
module.exports.renderLoginform = (req, res) => {
  res.render("Users/login.ejs");
};

//login
module.exports.login = async (req, res) => {
  req.flash("success", "Wellcome back to WonderLust!");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

//verify the logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged Out!");
    res.redirect("/listing");
  });
};
