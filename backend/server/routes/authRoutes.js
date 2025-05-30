const express = require('express');

const{
    loginUser,
    getUserInfo,
    registerUser,
} = require('./contollers/authController.js');

const router = express.Router();

router.post("/register" , registerUser);
router.post("login" , loginUser);
router.get("/getUser" , getUserInfo);

modules.exports = router;
