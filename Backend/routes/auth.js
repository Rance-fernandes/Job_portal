const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  registerAdmin,loginAdmin,logoutAdmin
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.post("/admin/logout", logoutAdmin);


module.exports = router;
