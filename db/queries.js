const pool = require("./pool");

async function getItemCount(){
    const SQLCommand = `SELECT COUNT(*) FROM items;`
    const {rows} = await pool.query(SQLCommand);
    const count = rows[0].count;
    return count;
}

async function getCategoryCount(){
    const SQLCommand = `SELECT COUNT(*) FROM categories;`
    const {rows} = await pool.query(SQLCommand);
    const count = rows[0].count;
    return count;
}

async function getInStockItemsCount(){
    const SQLCommand = `SELECT COUNT(*) FROM items WHERE quantity > 0;`;
    const {rows} = await pool.query(SQLCommand);
    const count = rows[0].count;
    return count;
}

async function getLowStockItemsCount(){
    const SQLCommand = 'SELECT COUNT(*) FROM items WHERE quantity <= threshold;';
    const {rows} = await pool.query(SQLCommand);
    const count = rows[0].count;
    return count;
}

async function getOutOfStockItemsCount(){
    const SQLCommand = 'SELECT COUNT(*) FROM items WHERE quantity = 0;';
    const {rows} = await pool.query(SQLCommand);
    const count = rows[0].count;
    return count;
}

async function getInventoryValue(){
    const SQLCommand = `SELECT SUM(price * quantity) FROM items; `;
    const {rows} = await pool.query(SQLCommand);
    const sum = rows[0].sum;
    return sum;
}

module.exports = {
    getItemCount,
    getCategoryCount,
    getInStockItemsCount,
    getLowStockItemsCount,
    getOutOfStockItemsCount,
    getInventoryValue
}