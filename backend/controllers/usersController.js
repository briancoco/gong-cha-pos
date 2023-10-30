const sql = require('../database/dbConfig');

// Get
const getUsersAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM users;
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getUsersAll: ' + error.message);

    }

};

const getUsersById = async (req, res) => {

};


// Post
const addUsers = async (req, res) => {

}


// Put
const updateUsersById = async (req, res) => {

}


// Delete
const deleteUsersById = async (req, res) => {

}


module.exports = {
    getUsersAll,
    getUsersById,
    addUsers,
    updateUsersById,
    deleteUsersById,

}