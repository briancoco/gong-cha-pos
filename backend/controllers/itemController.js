const sql = require('../database/dbConfig');
const format = require('../functions');

// Get

// Template http://.../item
const getItemAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM item;
        `
        res.status(200).json(resDB); 

    }
    catch (error) {
        console.error('Error occurred in getItemAll: ' + error.message);
        res.status(400).json({}); 

    }

};

// Template http://.../item/id
const getItemById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM item WHERE id = ${ req.params.id };
        `

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getItemById: ' + error.message);
        res.status(400).json({});

    }

};


// Post

// Template http://.../item
/*          Body   
*            {
*               order_id : ...,
*               drink_id : ...,
*               ind_price: ...,
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
*            }
*/
// Note: if any ingredients are not included in the body they will be set to the default value associated with given drink
const addItem = async (req, res) => {
    try {
        let ingredients = await sql`
            SELECT id, item_name FROM inventory;
        `;

        let defaultIngredients = await sql`
            SELECT * FROM drinks WHERE id = ${ req.body.drink_id };
        `;
        
        let newDrink = {};
        newDrink['order_id'] = req.body.order_id;
        newDrink['drink_id'] = req.body.drink_id;
        newDrink['ind_price'] = req.body.ind_price;

        ingredients.forEach(row => {
            const currIngredient = format.toLowerUnderscore(row.item_name);

            newDrink[currIngredient + '_id'] = row.id;
            newDrink[currIngredient] = req.body[currIngredient] || defaultIngredients[0][currIngredient];

        });


        await sql`
            INSERT INTO item ${ sql(newDrink) };
        `;

        res.status(200).send('Item Added');
        
    }
    catch (error) {
        console.error('Error occurred in addItem: ' + error.message);
        res.status(400).json({});

    }
    
};

// Template http://.../item/price
/*          Body   
*            {
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
*            }
*/
// Note: if any ingredients are not included in the body they will be set to the default value associated with given drink
const getItemPrice = async (req, res) => {
    try {
        const itemPrice = await getItemPriceHelper(req.body);
        if (itemPrice == -1) throw new Error("Issue in getItemPriceHelper");

        res.status(200).json( { price : itemPrice } );

    }
    catch (error) {
        console.error('Error occurred in getItemPrice: ' + error.message);
        res.status(400).json({});

    }   

}

const getItemPriceHelper = async (body) => {
    try {

        let INGREDIENTS = await sql`
            SELECT * FROM inventory;
        `;

        let DRINKS = await sql`
            SELECT * FROM drinks WHERE id = ${ body.drink_id };
        `;


        let localIngredients = {}
        INGREDIENTS.forEach(row => {
            const currIngredient = format.toLowerUnderscore(row.item_name);
            localIngredients[currIngredient] = [row.amount, row.price];

        });

        let item = body;
        let rollingPrice = 0;
        const currDrink = DRINKS[0];
        for (let i = 0; i < Object.keys(localIngredients).length; ++i) {
            const ing =  Object.keys(localIngredients)[i];

            // Note: If an ingredient is not included it will be assumed to cost 0
            if (currDrink[ing] < item[ing]) {
                rollingPrice += localIngredients[ing][1] * item[ing] // Price * qty

            }

        };

        return rollingPrice + parseInt(currDrink.price);

    }
    catch (error) {
        return -1;

    }

}


// Put

// Template http://.../item/id
//          body { /*Only key-value pairs that are going to be changed*/ }
const updateItemById = async (req, res) => {
    try {
        const updates = req.body;

        await sql`
            UPDATE item SET ${ sql(updates) } WHERE id= ${ req.params.id };
        `;

        res.status(200).send("Item Updated");

    }
    catch (error) {
        console.error('Error occurred in updateItemById: ' + error.message);
        res.status(400).json({});

    }

};


// Delete

// Template http://.../item/id
const deleteItemById = async (req, res) => {
    try {
        await sql`
            DELETE FROM item WHERE id= ${ req.params.id };
        `;

        res.status(200).send('Item Deleted');

    }
    catch (error) {
        console.error('Error occurred in deleteItemById: ' + error.message);
        res.status(400).json({});

    }

};


module.exports = {
    getItemAll,
    getItemById,
    addItem,
    updateItemById,
    deleteItemById,
    getItemPrice,
    getItemPriceHelper,

}