const sql = require('../database/dbConfig');

// Get
const getOrdersAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM orders;
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getOrdersAll: ' + error.message);

    }

};

const getOrdersById = async (req, res) => {

};


// Post
const addOrders = async (req, res) => {

}


// Put
const updateOrdersById = async (req, res) => {

}


// Delete
const deleteOrdersById = async (req, res) => {

}


module.exports = {
    getOrdersAll,
    getOrdersById,
    addOrders,
    updateOrdersById,
    deleteOrdersById,

}