const express = require("express");
const router = express.Router();
const { registration, login, user } = require('../../controller/user/user');
const authGard = require("../../middileware/authGard");

router.post("/registration", registration)
router.post("/login", login)
router.get("/user", authGard, user)






module.exports = router;