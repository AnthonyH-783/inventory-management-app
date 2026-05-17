const express = require("express");
const indexRouter = express.Router();
const statsController = require("../controllers/statsController");

indexRouter.get("/", statsController.getDashboardStats);


module.exports = indexRouter;