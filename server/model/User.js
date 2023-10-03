const mongosse = require("mongoose");

const UserSchema = new mongosse.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const userModel = mongosse.model("User", UserSchema);
module.exports = userModel;
