const sql = require('../database/dbConfig');
const format = require('../functions');

// Get

// Template http://.../drinks
const getDrinksAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM drinks;
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getDrinksAll: ' + error.message);
        res.status(400).json({});

    }

};

// Template http://.../drinks/id
const getDrinksById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM drinks WHERE id = ${ req.params.id };
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getDrinksById: ' + error.message);
        res.status(400).json({});
        
    }

};

// Template http://.../drinks/category/categoryName/?season=#
// Example  http://.../drinks/category/brewed_tea/?season=3
// Note makes assumption that all categories in database (not in query) are of form "Category Name"
const getAvailableDrinksByCategory = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM drinks WHERE category = ${ format.toUpperSpace(req.params.categoryName) } AND (availability = ${ req.query.season } OR availability = -1);
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getAvailableDrinksByCategory: ' + error.message);
        res.status(400).json({});

    }

};

// Template http://.../drinks/category/?season=#
const getAvailableDrinksCategories = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT DISTINCT category FROM drinks WHERE (availability = -1 OR availability = ${ req.query.season });
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occurred in getAvailableDrinksCategories: ' + error.message);
        res.status(400).json({});

    }

};


// Post

// Template http://.../drinks
/*          Body   
*            {
*               drink_name : ...,
*               price : ...,
*               category : ...,
*               availability : ...,
*
*               ice_cream : ...,
*               thai_tea : ...,
*               oreo_crumb : ...,
*               hibiscus_tea : ...,
*               taro_tea : ...,
*               bag : ...,
*               tapioca : ...,
*               ice : ...,
*               black_tea : ...,
*               straw : ...,
*               mango_jelly : ...,
*               lychee : ...,
*               oolong_tea : ...,
*               napkin : ...,
*               milk_foam : ...,
*               sugar : ...,
*               green_tea : ...,
*               milk : ...,
*               cup : ...,
*               coconut_jelly : ...,  
*
*               // Optional
*               description: ...,
*               image: ...
*            }
*/
// Note: if any ingredients are not included in the body they will be set to 0
const addDrinks = async (req, res) => {
    try {
        let ingredients = await sql`
            SELECT id, item_name FROM inventory;
        `;
        
        let newDrink = {};

        newDrink['drink_name'] = req.body.drink_name;
        newDrink['price'] = req.body.price;
        newDrink['category'] = req.body.category;
        newDrink['availability'] = req.body.availability || -1;

        newDrink['image'] = req.body.image || 'https://gongchadev3.s3.us-east-2.amazonaws.com/Vw0hSk_285_image/png';
        newDrink['description'] = req.body.description || format.toUpperSpace(req.body.drink_name);

        ingredients.forEach(row => {
            const currIngredient = format.toLowerUnderscore(row.item_name);

            newDrink[currIngredient + '_id'] = row.id;
            newDrink[currIngredient] = req.body[currIngredient] || 0;

        });


        await sql`
            INSERT INTO drinks ${ sql(newDrink) };
        `;

        res.status(200).send('Drink Added');

    }
    catch (error) {
        console.error('Error occurred in addDrinks: ' + error.message);
        res.status(400).json({});

    }
    
};


// Put

// Template http://.../drinks/id
//          body { /*Only key-value pairs that are going to be changed*/ }
const updateDrinksById = async (req, res) => {
    try {
        const updates = req.body;

        await sql`
            UPDATE drinks SET ${ sql(updates) } WHERE id= ${ req.params.id };
        `;

        res.status(200).send("Drink Updated");

    }
    catch (error) {
        console.error('Error occurred in updateDrinksById: ' + error.message);
        res.status(400).json({});

    }

};


// Delete

// Template http://.../drinks/id
const deleteDrinksById = async (req, res) => {
    try {
        await sql`
            DELETE FROM drinks WHERE id= ${ req.params.id };
        `;

        res.status(200).send('Drink Deleted');

    }
    catch (error) {
        console.error('Error occurred in deleteDrinksById: ' + error.message);
        res.status(400).json({});

    }

};


module.exports = {
    getDrinksAll,
    getDrinksById,
    addDrinks,
    updateDrinksById,
    deleteDrinksById,
    getAvailableDrinksByCategory,
    getAvailableDrinksCategories,

}