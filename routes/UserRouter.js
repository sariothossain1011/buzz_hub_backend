const express = require("express");
const { Registration, Login } = require("../controller/UserController");
const router = express.Router();


router.post("/Signup", Registration);
router.post("/Login", Login);






module.exports = router;