const db = require("../db/queries");

exports.getItemsByCategory = async(req, res) => {
    // Unpacking category
    let category = req.params.category;
    const categories = ["all", "Hand Tools", "Power Tools", "Fasteners", "Electrical", "Plumbing", "Paint & Supplies"];
    if (!categories.includes(category)) category = "all";
    try{
        const items = await db.getItemsByCategory(category);
        return res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

