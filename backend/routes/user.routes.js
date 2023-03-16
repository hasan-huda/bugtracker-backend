const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  findAllUsers,
  findOneUserById,
  findOneUser,
  updateUser,
  deleteUser,
  changePassword
} = require("../controllers/user.controllers");


userRouter
  .route('/')
  .get(findAllUsers)
  .post(createUser)

userRouter
  .route('/login')
  .post(findOneUser)

userRouter
  .route('/:id')
  .get(findOneUserById)
  .put(updateUser)
  .delete(deleteUser);

userRouter
  .route('/:id/password')
  .put(changePassword)

module.exports = userRouter;