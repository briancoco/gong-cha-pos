const sql = require('../database/dbConfig');
const moment = require('moment');
const format = require('../functions');

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
        console.error('Error occurred in getOrdersAll: ' + error.message);
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
        console.error('Error occurred in getOrdersById: ' + error.message);
        res.status(400).json({});

    }

};


// Post

// Template http://.../orders/?user=id
/*          body 
*            [
*              {
*               drink_id : ...,
*
*               ice_cream: ...,
*               thai_tea: ...,
*               oreo_crumb: ...,
*               hibiscus_tea: ...,
*               taro_tea: ...,
*               bag: ...,
*               tapioca: ...,
*               ice: ...,
*               black_tea: ...,
*               straw: ...,
*               mango_jelly: ...,
*               lychee: ...,
*               oolong_tea: ...,
*               napkin: ...,
*               milk_foam: ...,
*               sugar: ...,
*               green_tea: ...,
*               milk: ...,
*               cup: ...,
*               coconut_jelly: ...    
*              },
*              {
*               drink_id : ...,
*
*               ice_cream: ...,
*               thai_tea: ...,
*               oreo_crumb: ...,
*               hibiscus_tea: ...,
*               taro_tea: ...,
*               bag: ...,
*               tapioca: ...,
*               ice: ...,
*               black_tea: ...,
*               straw: ...,
*               mango_jelly: ...,
*               lychee: ...,
*               oolong_tea: ...,
*               napkin: ...,
*               milk_foam: ...,
*               sugar: ...,
*               green_tea: ...,
*               milk: ...,
*               cup: ...,
*               coconut_jelly: ...    
*              }
*              .
*              .
*              .
*           ]
*/
const addOrders = async (req, res) => {
    try {

        let INGREDIENTS = await sql`
            SELECT * FROM inventory;
        `;

        let DRINKS = await sql`
            SELECT * FROM drinks ORDER BY id;
        `;

        let drinksArray = Array(DRINKS[DRINKS.length - 1]['id']);
        for (let i = 0; i < DRINKS.length; ++i) {
            drinksArray[DRINKS[i]['id']] = DRINKS[i];

        };

        let localIngredients = {}
        INGREDIENTS.forEach(row => {
            const currIngredient = format.toLowerUnderscore(row.item_name);
            localIngredients[currIngredient] = [row.amount, row.price];

        });

        let totalPrice = 0;
        const items = req.body;
        console.log(items);
        for (let i = 0; i < items.length; ++i) {
            let item = items[i];

            let rollingPrice = 0;
            const currDrink = drinksArray[item.drink_id];
            for (let j = 0; j < Object.keys(localIngredients).length; ++j) {
                const ing =  Object.keys(localIngredients)[j];

                if (currDrink[ing] < item[ing]) {
                    rollingPrice += localIngredients[ing][1] * item[ing] // Price * qty

                }

                localIngredients[ing][0] -= item[ing];
                if (localIngredients[ing][0] < 0) {
                    res.status(409).send('Insufficient Ingredients');
                    return;

                }

            };

            item['ind_price'] = parseInt(currDrink.price) + rollingPrice; 
            totalPrice += item['ind_price'];

        };

        // Create Order
        let newOrder = {};

        if (!(req.query.user)) throw new Error('user_id not specified')

        newOrder['total_price'] = totalPrice;
        newOrder['user_id'] = req.query.user;
        newOrder['time_ordered'] = moment().format('YYYY-MM-DD HH:mm:ss');

        await sql`
            INSERT INTO orders ${ sql(newOrder) };
        `;    

        let orderId = await sql`
            SELECT id FROM orders ORDER BY id DESC LIMIT 1;
        `;  

        // Create Items
        orderId = orderId[0]['id'];
        for (let i = 0; i < items.length; ++i) {
            items[i]['order_id'] = orderId;

            let newDrink = items[i];
    
            INGREDIENTS.forEach(row => {
                const currIngredient = format.toLowerUnderscore(row.item_name);
                newDrink[currIngredient + '_id'] = row.id;

            });
            delete newDrink.image;
            delete newDrink.name;

            await sql`
                INSERT INTO item ${ sql(newDrink) };
            `;

        }

        // Update Inventory
        for (let i = 0; i < Object.keys(localIngredients).length; ++i) {
            const currIng = Object.keys(localIngredients)[i];

            const updates = { 'amount' : localIngredients[currIng][0] };

            await sql`
                UPDATE inventory SET ${ sql(updates) } WHERE item_name = ${ format.toUpperSpace(currIng) };
            `;

        }

        res.status(200).send('Order Added');
        
    }
    catch (error) {
        console.error('Error occurred in addOrders: ' + error.message);
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
        console.error('Error occurred in updateOrdersById: ' + error.message);
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
        console.error('Error occurred in deleteOrdersById: ' + error.message);
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