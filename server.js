const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const register = require("./routes/register");
const profile = require("./routes/profile");
const login = require("./routes/login");
const entry = require("./routes/entry");

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./config/passport")(app);

const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/register", register);
app.use("/api/profile", profile);
app.use("/api/login", login);
app.use("/api/entry", entry);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
