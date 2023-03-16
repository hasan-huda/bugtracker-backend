const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json(err));
};

const findAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(400).json(err));
};

const findOneUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const findOneUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      // If the user is not found, return an error message
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if the password is correct
      bcrypt.compare(password, user.password, (err, isPasswordCorrect) => {
        // If there is an error with bcrypt, return an error message
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        // If the password is incorrect, return an error message
        if (!isPasswordCorrect) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // If the email and password are correct, return the user object
        res.status(200).json(user);
      });
    })
    .catch((err) => res.status(400).json(err));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

const changePassword = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
  const hashedPassword = hashPassword(password);
  req.body.password = hashedPassword;
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  createUser,
  findAllUsers,
  findOneUserById,
  findOneUser,
  updateUser,
  deleteUser,
  changePassword
};
