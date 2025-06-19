const express = require('express');


import { loginUser , registerUser , getUserInfo } from '../controllers/authController';

const router = express.Router();

router.post("/register" , registerUser);
router.post("login" , loginUser);
router.get("/getUser" , getUserInfo);

modules.exports = router;
