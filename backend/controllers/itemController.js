const sql = require('../database/dbConfig');

// Get
const getItemAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM item;
        `
        res.json(resDB); 

    }
    catch (error) {
        console.error('Error occured in getItemAll: ' + error.message);

    }

};

const getItemById = async (req, res) => {

};


// Post
const addItem = async (req, res) => {

}


// Put
const updateItemById = async (req, res) => {

}


// Delete
const deleteItemById = async (req, res) => {

}


module.exports = {
    getItemAll,
    getItemById,
    addItem,
    updateItemById,
    deleteItemById,

}