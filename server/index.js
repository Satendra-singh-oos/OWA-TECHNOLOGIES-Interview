const express = require("express");
const jwt = require("jsonwebtoken");
const cokkieParser = require("cookie-parser");
const mongosse = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./model/User");
const authRoutes = require("./routes/auth");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8081;

mongosse
  .connect("mongodb://127.0.0.1:27017/test")
  .then(console.log("DB conneted"));

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is up and RUning${PORT}`);
});
