const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const register = require("./routes/register");
const profile = require("./routes/profile");
const login = require("./routes/login");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* app.use(cookieParser());
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
})); */
require("./config/passport")(app);

const db = process.env.MONGO_URI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/register", register);
app.use("/profile", profile);
app.use("/login", login);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
