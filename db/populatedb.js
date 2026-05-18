const {Client} = require("pg");
require("dotenv").config();



const SQLCreateTables = `

CREATE TABLE IF NOT EXISTS categories(
    id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name            VARCHAR(50) NOT NULL UNIQUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS items(
    id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name            VARCHAR(50) NOT NULL,
    image_url       TEXT DEFAULT 'https://placehold.co/50x50',
    category_id     INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    price           NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    quantity        INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    threshold       INTEGER NOT NULL DEFAULT 10 CHECK (threshold >= 0),
    sku             VARCHAR(50) UNIQUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users(

    id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name            VARCHAR(50) NOT NULL,
    email           VARCHAR(50) NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    role            VARCHAR(50) NOT NULL CHECK(role IN ('admin', 'client')),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS stock_log(

    id              INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    item_id         INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
    change          INTEGER NOT NULL,
    qty_before      INTEGER NOT NULL,
    qty_after       INTEGER NOT NULL,
    reason          VARCHAR(255),
    created_at      TIMESTAMP NOT NULL
);




CREATE OR REPLACE FUNCTION set_update_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER items_updated_at
BEFORE UPDATE ON ITEMS
FOR EACH ROW
WHEN(OLD IS DISTINCT FROM NEW)
EXECUTE FUNCTION set_update_at();
`;

const SQLCreateCategories = `
    INSERT INTO categories (name) VALUES
    ('Hand Tools'),
    ('Power Tools'),
    ('Fasteners'),
    ('Electrical'),
    ('Plumbing'),
    ('Paint & Supplies');
`;

const addSampleItems = `
    INSERT INTO items (name, category_id, sku, quantity, price) VALUES
    ('Tape Measure 25ft', (SELECT id FROM categories WHERE name = 'Hand Tools'), 'HT-001', 8, 12.49),
    ('Needle-Nose Pliers', (SELECT id FROM categories WHERE name = 'Hand Tools'), 'HT-002', 6, 14.99);
`



async function main(){

    console.log(`Seeding`);
    const client = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT
    });
    await client.connect();
    await client.query(SQLCreateTables);
    await client.query(SQLCreateCategories);
    await client.end();
    console.log(`Populating db done`);
}

main();