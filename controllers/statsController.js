const pool = require("../db/queries");
const {getItemCount,
       getCategoryCount,
       getInStockItemsCount,
       getLowStockItemsCount,
       getOutOfStockItemsCount,
       getInventoryValue } = require("../db/queries");


exports.getDashboardStats = async (req, res) => {
    const [itemCount, categoryCount, inStock, lowStock, outOfStock, stockValue] = await Promise.all([
        getItemCount(),
        getCategoryCount(),
        getInStockItemsCount(),
        getLowStockItemsCount(),
        getOutOfStockItemsCount(),
        getInventoryValue()
    ]);
    console.log([itemCount, categoryCount, inStock, lowStock, outOfStock, stockValue]);
    res.render("index", {itemCount, categoryCount, inStock, lowStock, outOfStock, stockValue});

}