const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require("passport");

const users = require("./routes/userRouter");
const countries = require("./routes/countryRouter")
const assumptions = require("./routes/assumptionRouter")

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());

// // Passport config
require("./config/passport")(passport);

// Routing
app.use("/api/users", users);
app.use("/api/countries", countries);
app.use("/api/assumptions", assumptions);

// DB Config
const db = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log('DB Connection Error: ', err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
