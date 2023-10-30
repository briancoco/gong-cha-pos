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


module.exports = {
    getDrinksAll,
    getDrinksById,
    addDrinks,
    updateDrinksById,
    deleteDrinksById,

}