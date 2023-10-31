const sql = require('../database/dbConfig');
const format = require('../functions');

// Get
const getDrinksAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM drinks;
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getDrinksAll: ' + error.message);

    }

};

const getDrinksById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM drinks WHERE id = ${ req.params.id };
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getDrinksById: ' + error.message);

    }
};


// Post
const addDrinks = async (req, res) => {
    try {
        let ingredients = await sql`
            SELECT id, item_name FROM inventory;
        `
        
        let newDrink = {};

        newDrink['drink_name'] = req.body.drink_name;
        newDrink['price'] = req.body.price;
        newDrink['category'] = req.body.category;
        newDrink['availability'] = req.body.availability || -1;

        ingredients.forEach(row => {
            const currIngredient = format.toLowerUnderscore(row.item_name);

            newDrink[currIngredient + '_id'] = row.id;
            newDrink[currIngredient] = req.body[currIngredient] || 0;

        });


        await sql`
            INSERT INTO drinks ${ sql(newDrink) };
        `    
        res.status(200).send('Drink Added');

    }
    catch (error) {
        console.error('Error occured in addDrinks: ' + error.message);

    }
    
}


// Put
const updateDrinksById = async (req, res) => {

}


// Delete
const deleteDrinksById = async (req, res) => {

}


module.exports = {
    getDrinksAll,
    getDrinksById,
    addDrinks,
    updateDrinksById,
    deleteDrinksById,

}