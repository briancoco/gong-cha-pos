const sql = require('../database/dbConfig');

// Get
const getInventoryAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM inventory;
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getInventoryAll: ' + error.message);

    }

};

const getInventoryById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM inventory WHERE id = ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getInventoryById: ' + error.message);
    }
};


// Post
const addInventory = async (req, res) => {

}


// Put
const updateInventoryById = async (req, res) => {
    try {
        let resDB = await sql`
            UPDATE inventory SET amount= ${req.body.amount}, price=${req.body.price}, min_threshold=${req.body.min_threshold}, item_name=${req.body.item_name} WHERE id= ${req.params.id}
        `
        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in updateInventoryById: ' + error.message);
    }
}


// Delete
const deleteInventoryById = async (req, res) => {
    try {
        let resDB = await sql`
            DELETE FROM inventory WHERE id= ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in deleteInventoryById: ' + error.message);
    }
}


module.exports = {
    getInventoryAll,
    getInventoryById,
    addInventory,
    updateInventoryById,
    deleteInventoryById,

}