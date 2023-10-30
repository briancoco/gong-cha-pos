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
    try {
        let resDB = await sql`
            SELECT * FROM orders WHERE id = ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getOrdersById: ' + error.message);
    }
};


// Post
const addOrders = async (req, res) => {
    
}


// Put
const updateOrdersById = async (req, res) => {
    try {
        // unneeded? 
        // let resDB = await sql`
        //     UPDATE orders SET amount= ${req.body.amount}, price=${req.body.price}, min_threshold=${req.body.min_threshold} WHERE item_name=${req.body.item_name} WHERE id= ${req.params.id}
        // `
        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in updateUsersById: ' + error.message);
    }
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