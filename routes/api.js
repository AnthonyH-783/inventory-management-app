const express = require("express");
const api = express.Router();
const itemsController = require("../controllers/itemsController");


api.use("/:category", itemsController.getItemsByCategory);



module.exports = api;