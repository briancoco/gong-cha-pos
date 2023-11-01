const { config } = require('dotenv');
const sql = require('../database/dbConfig');
const format = require('../functions');

// Get

// Template http://.../inventory
const getInventoryAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM inventory;
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getInventoryAll: ' + error.message);
        res.status(400).json({});

    }

};

// Template http://.../inventory/id
const getInventoryById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM inventory WHERE id = ${ req.params.id };
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getInventoryById: ' + error.message);
        res.status(400).json({});

    }

};


// Post

// Template http://.../inventory
//          Body { item_name : ..., amount : ..., price : ..., min_threshold : ... }
const addInventory = async (req, res) => {
    try {
        let newIngredient = {};

        newIngredient['item_name'] = req.body.item_name;
        newIngredient['amount'] = req.body.amount;
        newIngredient['price'] = req.body.price;
        newIngredient['min_threshold'] = req.body.min_threshold;

        await sql`
            INSERT INTO inventory ${ sql(newIngredient) };
        `;

        let colName = format.toLowerUnderscore(req.body.item_name);

        await sql`
        ALTER TABLE drinks ADD ${ sql(colName) } INT DEFAULT 0;
        `;

        await sql`
        ALTER TABLE item ADD ${ sql(colName) } INT DEFAULT 0;
        `;

        res.status(200).send('Ingredient Added');
        
    }
    catch (error) {
        console.error('Error occurred in addInventory: ' + error.message);
        res.status(400).json({});

    }
    
};


// Put

// Template http://.../inventory/id
//          body { /*Only key-value pairs that are going to be changed*/ }
const updateInventoryById = async (req, res) => {
    try {
        const updates = req.body;

        await sql`
            UPDATE inventory SET ${ sql(updates) } WHERE id = ${ req.params.id };
        `;

        res.status(200).send('Ingredient Updated');

    }
    catch (error) {
        console.error('Error occurred in updateInventoryById: ' + error.message);
        res.status(400).json({});

    }

};


// Delete
// Template http://.../inventory/id
const deleteInventoryById = async (req, res) => {
    try {
        let resDB = await sql`
            DELETE FROM inventory WHERE id= ${ req.params.id };
        `;

        res.status(200).send('Ingredient Deleted');

    }
    catch (error) {
        console.error('Error occurred in deleteInventoryById: ' + error.message);
        res.status(400).json({});

    }

};


module.exports = {
    getInventoryAll,
    getInventoryById,
    addInventory,
    updateInventoryById,
    deleteInventoryById,

}