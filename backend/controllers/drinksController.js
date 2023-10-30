const sql = require('../database/dbConfig');

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

};


// Post
const addDrinks = async (req, res) => {

}


// Put
const updateDrinksById = async (req, res) => {

}


// Delete
const deleteDrinksById = async (req, res) => {

}

const availableDrinks = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM drinks WHERE category = ${req.body.category} AND (availability = ${req.body.availability} OR availability = -1);
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in availableDrinks: ' + error.message);

    }
}

const availableCategory = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT DISTINCT category FROM drinks WHERE (availability = -1 OR availability = ${req.body.availability});
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in availableDrinks: ' + error.message);

    }
}


module.exports = {
    getDrinksAll,
    getDrinksById,
    addDrinks,
    updateDrinksById,
    deleteDrinksById,
    availableDrinks,
    availableCategory
}