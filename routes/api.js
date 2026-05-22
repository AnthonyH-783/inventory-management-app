const express = require("express");
const api = express.Router();
const itemsController = require("../controllers/itemsController");

api.get("/items", itemsController.getItems);
api.post("/items", itemsController.postItemForm);
api.post("/items/:itemId/edit", itemsController.postUpdateItemForm);
api.post("/items/:itemId/delete", itemsController.postDeleteItem);




module.exports = api;