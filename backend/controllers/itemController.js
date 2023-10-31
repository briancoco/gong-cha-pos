const sql = require('../database/dbConfig');
const format = require('../functions');

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
        `    
        res.status(200).send('Item Added');
        
    }
    catch (error) {
        console.error('Error occured in addItem: ' + error.message);

    }
    
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