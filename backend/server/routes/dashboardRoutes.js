const express = require("express");

const {getDashboardData} = require("../controllers/dashboardController");

const router = express.Router();

// route to get dashboard data
router.get("/" , getDashboardData);


module.exports = router;