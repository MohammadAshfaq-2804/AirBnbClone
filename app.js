if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ override: true });
}
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/expresserror.js");
const session = require("express-session"); 
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const User=require("./models/user.js");
const passport=require("passport");
const localStrategy=require("passport-local");
const Listingrouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/users.js");

// let mongodburl="mongodb://127.0.0.1:27017/wonderlust";
let atlasUrl=process.env.ATLAS_URL;
//conection to the database using the Mongoose
main()
  .then((res) => {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(atlasUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, "/public")));

//store cookie session in monogo atlas
const store= MongoStore.create({
  mongoUrl:atlasUrl,
  crypto:{
     secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

//intializing the session
const sesstionOpion={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7,
    httpOnly:true
  }
}

app.use(session(sesstionOpion));
app.use(flash());

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware to set the flash message using locals
app.use((req,res,next)=>
{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.curruser=req.user;
  next();
});


//require the routes
app.use("/listing",Listingrouter);
app.use("/listing/:id/reviews",reviewRouter);
app.use("/",userRouter);

//for wrong path
app.all("/*path", (req, res, next) => {
  next(new ExpressError(400, "Page Not Found"));
});

//middleware to handle the error
app.use((err, req, res, next) => {
  let { status = 500, message = "Some Thing went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

//port connection
app.listen(3000, () => {
  console.log("Server is started");
});
