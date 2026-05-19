const db = require("../db/queries");
const {formatTableRows} = require("./formatters");

exports.getItems = async(req, res) => {
    try{
        const {category, lowStock} = req.query;
        
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