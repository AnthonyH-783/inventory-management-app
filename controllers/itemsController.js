const db = require("../db/queries");
const {formatTableRows} = require("./formatters");

exports.getItemsByCategory = async(req, res) => {
    // Unpacking category
    const category = req.params.category;
    console.log(category);
    const categories = ["all", "Hand Tools", "Power Tools", "Fasteners", "Electrical", "Plumbing", "Paint & Supplies"];
    if (!categories.includes(category)) return;
    try{
        console.log("Hi");
        const items = await db.getItemsByCategory(category);
        console.log("Ho");
        formatTableRows(items);
        return res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getLowStockItems = async(req, res) => {
    try{
        const items = await db.getLowStockItems();
        formatTableRows(items);
        res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

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