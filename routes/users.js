const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapasync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveredirecturl } = require("../middleware.js");
const userController = require("../controller/users.js");

//signup form and post in db
router
  .route("/signup")
  .get(userController.renderSignupform)
  .post(wrapasync(userController.signup));

//login form and verify the user using the passport middleware
router
  .route("/login")
  .get(userController.renderLoginform)
  .post(
    saveredirecturl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login,
  );

  
//logged out ussing the req.logout
router.get("/logout", userController.logout);

module.exports = router;
