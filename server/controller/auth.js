const User = require("../model/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  if (!newUser) {
    res.json(err);
  }
  res.status(200).json(newUser);
};

const bcryptSalt = bcrypt.genSaltSync(10);

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        "secretKey",
        {},
        (err, token) => {
          if (err) res.json(err);
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password Dont Match");
    }
  } else {
    res.json("No Info found");
  }
};
