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
    const SQLCommand = `SELECT COUNT(*) FROM items WHERE quantity > threshold;`;
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
    const sum = rows[0].sum ?? 0;
    return sum;
}

async function getItemsByCategory(category) {
    const categories = ["all", "Hand Tools", "Power Tools", "Fasteners", "Electrical", "Plumbing", "Paint & Supplies"];
    if (!categories.includes(category)) return;

    if (category === "all") {
        const { rows } = await pool.query('SELECT * FROM items');
        return rows;
    }

    const category_id = (await pool.query('SELECT category_id FROM categories WHERE name = $1', [category])).rows[0]?.category_id;
    if (!category_id) return; // guard if category name not found in DB

    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [category_id]);
    return rows;
}

module.exports = {
    getItemCount,
    getCategoryCount,
    getInStockItemsCount,
    getLowStockItemsCount,
    getOutOfStockItemsCount,
    getInventoryValue, 
    getItemsByCategory
}