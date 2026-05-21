const express = require("express");
const indexRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");
const itemsController = require("../controllers/itemsController");

indexRouter.get("/", dashboardController.getDashboardStats);
indexRouter.get("/items/new", itemsController.getItemForm );
indexRouter.get("/items/:itemId/edit", itemsController.getUpdateItemForm);
//indexRouter.get("/items/:itemId", itemsController.getItemDetails);
//indexRouter.get("items/:itemsId/delete", itemsController.getDeleteForm);



module.exports = indexRouter;