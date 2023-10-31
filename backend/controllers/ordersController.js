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
    try {
        let newOrder = {};

        newOrder['total_price'] = req.body.total_price;
        newOrder['user_id'] = req.body.user_id;
        newOrder['time_ordered'] = req.body.time_ordered;

        await sql`
            INSERT INTO orders ${ sql(newOrder) };
        `    

        res.status(200).send('Order Added');
        
    }
    catch (error) {
        console.error('Error occured in addOrders: ' + error.message);

    }

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