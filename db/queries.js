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
    
    const category_id = (await pool.query('SELECT id FROM categories WHERE name = $1', [category])).rows[0]?.id;
    if (!category_id) return; // guard if category name not found in DB

    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [category_id]);
    return rows;
}

async function getLowStockItems(){
    const SQLCommand = `SELECT * FROM items WHERE quantity <= threshold;`;
    const {rows} = await pool.query(SQLCommand);
    console.log(rows);
    return rows;
}

async function getItems(category, lowStock) {
  
  let query = `
    SELECT i.*, c.name AS category_name
    FROM items i
    JOIN categories c ON i.category_id = c.id
    WHERE 1=1
  `;


  const params = [];
    console.log("before if statement");
    console.log(category, lowStock);
  if (category && category !== 'all') {
    params.push(category);
    query += ` AND c.name = $${params.length}`;
  }

      console.log("After first if statement");
  if (lowStock) {
    query += ` AND i.quantity <= i.threshold`;
  }
  console.log(query);
  const { rows } = await pool.query(query, params);
  return rows;
}

async function addItem({name, category, price, quantity, threshold, sku, image_url, created_at, updated_at}){

    const query = `INSERT INTO items(name, 
                 SELECT id FROM categories AS c WHERE c.name = $2 ,
                 price, quantity, threshold, sku, created_at, updated_at)
                 VALUES
                 ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 `;

                

}

module.exports = {
    getItemCount,
    getCategoryCount,
    getInStockItemsCount,
    getLowStockItemsCount,
    getOutOfStockItemsCount,
    getInventoryValue, 
    getItemsByCategory,
    getLowStockItems,
    getItems,
    addItem
}