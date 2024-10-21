const router = require("express").Router();
const passport = require('passport');

const {
  register, 
  login, 
  getUsers, 
  calculateCount, 
  updateUserByAdmin, 
  getCurrentUser, 
  deleteUser
} = require("../controllers/userController")

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getUsers").get(getUsers);
router.route("/").get(getCurrentUser);
router.route("/updateByAdmin").post(updateUserByAdmin)
router.route("/delete").post(deleteUser)
router.route("/calculateCount").post(calculateCount)

module.exports = router;
