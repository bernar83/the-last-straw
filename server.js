const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const register = require("./routes/register");
const profile = require("./routes/profile");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ 
  secret: require("./config/keys").sessionSecret,
  saveUninitialized: false,
  resave: false
}));
require('./config/passport')(app);

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/register", register);
app.use("/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
