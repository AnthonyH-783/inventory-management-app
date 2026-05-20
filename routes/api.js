const express = require("express");
const api = express.Router();
const itemsController = require("../controllers/itemsController");

api.get("/items", itemsController.getItems);
api.post("/items", itemsController.postItemForm);




module.exports = api;