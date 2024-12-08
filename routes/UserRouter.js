const express = require("express");
const { Registration, Login, UserInfo } = require("../controller/UserController");
const { RequireSignIn } = require("../middleware/AuthMiddleware");
const router = express.Router();


router.post("/Signup", Registration);
router.post("/Login", Login);
router.get("/UserInfo", RequireSignIn, UserInfo);





module.exports = router;