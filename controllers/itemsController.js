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
        res.status(201).json(attributes);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}