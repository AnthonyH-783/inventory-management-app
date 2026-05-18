const express = require("express");
const indexRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

indexRouter.get("/", dashboardController.getDashboardStats);


module.exports = indexRouter;