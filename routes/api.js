const express = require("express");
const api = express.Router();
const itemsController = require("../controllers/itemsController");

api.get("/lowStock", itemsController.getLowStockItems);
api.get("/:category", itemsController.getItemsByCategory);




module.exports = api;