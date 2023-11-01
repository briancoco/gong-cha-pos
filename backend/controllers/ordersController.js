const sql = require('../database/dbConfig');

// Get

// Template http://.../orders
const getOrdersAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM orders;
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occured in getOrdersAll: ' + error.message);
        res.status(400).json({});

    }

};

// Template http://.../orders/id
const getOrdersById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM orders WHERE id = ${ req.params.id };
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occured in getOrdersById: ' + error.message);
        res.status(400).json({});

    }

};


// Post

// Template http://.../orders
//          body { total_price : ..., user_id : ..., time_ordered : ... }
const addOrders = async (req, res) => {
    try {
        let newOrder = {};

        newOrder['total_price'] = req.body.total_price;
        newOrder['user_id'] = req.body.user_id;
        newOrder['time_ordered'] = req.body.time_ordered;

        await sql`
            INSERT INTO orders ${ sql(newOrder) };
        `;    

        res.status(200).send('Order Added');
        
    }
    catch (error) {
        console.error('Error occured in addOrders: ' + error.message);
        res.status(400).json({});

    }

};

// Template http://.../orders
//          body { total_price : ..., user_id : ..., time_ordered : ... }
const addOrdersWithItems = async (req, res) => {
    try {
        let newOrder = {};

        newOrder['total_price'] = req.body.total_price;
        newOrder['user_id'] = req.body.user_id;
        newOrder['time_ordered'] = req.body.time_ordered;

        await sql`
            INSERT INTO orders ${ sql(newOrder) };
        `;    

        res.status(200).send('Order Added');
        
    }
    catch (error) {
        console.error('Error occured in addOrders: ' + error.message);
        res.status(400).json({});

    }

};


// Put

// Template http://.../orders/id
//          body { /*Only key-value pairs that are going to be changed*/ }
const updateOrdersById = async (req, res) => {
    try {
        const updates = req.body;

        await sql`
            UPDATE orders SET ${ sql(updates) } WHERE id= ${ req.params.id };
        `;

        res.status(200).send("Order Updated")

    }
    catch (error) {
        console.error('Error occured in updateOrdersById: ' + error.message);
        res.status(400).json({});

    }

};


// Delete

// Template http://.../orders/id
const deleteOrdersById = async (req, res) => {
    try {

        await sql`
            DELETE FROM orders WHERE id= ${ req.params.id };
        `;

        res.status(200).send("Order Deleted")

    }
    catch (error) {
        console.error('Error occured in deleteOrdersById: ' + error.message);
        res.status(400).json({});

    }

};


module.exports = {
    getOrdersAll,
    getOrdersById,
    addOrders,
    updateOrdersById,
    deleteOrdersById,

}