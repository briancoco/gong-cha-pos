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
    try {
        let resDB = await sql`
            SELECT * FROM item WHERE id = ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getItemById: ' + error.message);
    }
};


// Post
const addItem = async (req, res) => {

}


// Put
const updateItemById = async (req, res) => {
    // try {
    //     let resDB = await sql`
    //         UPDATE items SET ...
    //     `
    //     res.json(resDB);

    // }
    // catch (error) {
    //     console.error('Error occured in updateItemById: ' + error.message);
    // }
}


// Delete
const deleteItemById = async (req, res) => {
    try {
        let resDB = await sql`
            DELETE FROM items WHERE id= ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in deleteItemById: ' + error.message);
    }
}


module.exports = {
    getItemAll,
    getItemById,
    addItem,
    updateItemById,
    deleteItemById,

}