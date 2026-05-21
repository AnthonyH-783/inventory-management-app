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
  if (category && category !== 'all') {
    params.push(category);
    query += ` AND c.name = $${params.length}`;
  }
  if (lowStock) {
    query += ` AND i.quantity <= i.threshold`;
  }
  const { rows } = await pool.query(query, params);
  return rows;
}

async function addItem({name, category, price, quantity, threshold, sku, image_url, created_at, updated_at}){

    let query = `INSERT INTO items(name, 
                 category_id ,
                 price,
                 quantity,
                 threshold,
                 sku,
                 created_at,
                 updated_at) VALUES
                 ($1,
                 (SELECT id FROM categories WHERE name = $2),
                  $3, $4, $5, $6, $7, $8)
                 `;
    const params = [name, category, price, quantity, threshold, sku, created_at, updated_at];

    await pool.query(query, params);
    
}

async function getItem(itemId){

    const query = ` SELECT items.*, categories.name category_name
                    FROM items
                    INNER JOIN categories
                    ON items.category_id = categories.id
                    WHERE items.id = $1
                    `;

    const {rows} = await pool.query(query, [itemId]);
    return rows[0];
}

async function updateItem(itemId , {name, category, price, quantity, threshold, sku, updated_at, image_url}){

    const query = `UPDATE items
                   SET name = $1,
                   category_id = (SELECT id FROM categories WHERE name = $2),
                   price = $3,
                   quantity = $4,
                   threshold = $5,
                   sku = $6,
                   updated_at = $7,
                   image_url = $8
                   WHERE id = $9 
                 `;
    const params = [name, category, price, quantity, threshold, sku, updated_at, image_url, itemId];

    await pool.query(query, params);
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
    addItem,
    getItem,
    updateItem
}