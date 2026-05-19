const express = require("express");
const api = express.Router();
const itemsController = require("../controllers/itemsController");

api.get("/items", itemsController.getItems);




module.exports = api;