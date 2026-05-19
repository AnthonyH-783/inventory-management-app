const express = require("express");
const indexRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");
const itemsController = require("../controllers/itemsController");

indexRouter.get("/", dashboardController.getDashboardStats);
indexRouter.get("/items/new", itemsController.getItemForm );


module.exports = indexRouter;