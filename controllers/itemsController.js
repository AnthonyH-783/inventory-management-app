const { error } = require("node:console");
const db = require("../db/queries");
const {formatTableRows} = require("./formatters");

exports.getItems = async(req, res) => {
    try{
        const {category, lowStock} = req.query;
        console.log(category, lowStock);
        const items = await db.getItems(category, lowStock);
        formatTableRows(items);
        res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getItemForm = (req, res) => {
    res.render("partials/itemForm", {title: "New Item"});
}

exports.postItemForm = async (req, res)  => {
    try{
        const attributes = Object.assign({created_at: new Date(), updated_at: new Date()}, req.body);
        await db.addItem(attributes);
        res.redirect("/");

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getUpdateItemForm = async (req, res) => {
    // Retrieving item info
    try{
        // Extracting id
        const itemId = req.params.itemId;
        if(!itemId) throw new Error("itemId not found in request parameters");
        // Retrieving current data from database
        const item = await db.getItem(itemId);
        // Rendering edit form with item data
        res.render("partials/editItem", {title: "Update Item", item});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.postUpdateItemForm = async (req, res) => {
    try{
        req.body.updated_at = new Date();
        const itemId = req.params.itemId;
        await db.updateItem(itemId, req.body);
        res.redirect("/");
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}