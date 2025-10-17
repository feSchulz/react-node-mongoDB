const express = require("express");
const router = express.Router();

//Controller
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserByid,
} = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidation")
const {
  userCreateValidation,
  loguinValidation,
  userUpdateValidation,
} = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");
//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loguinValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/",
  authGuard,
  imageUpload.single("profileImage"),
  userUpdateValidation(),
  validate,
  update
);
router.get("/:id", getUserByid);
module.exports = router;

