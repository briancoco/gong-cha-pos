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
    try {
        let newUser = {};

        newUser['position'] = req.body.position;
        newUser['date_hired'] = req.body.date_hired;
        newUser['user_name'] = req.body.user_name;
        newUser['user_password'] = req.body.user_password;

        await sql`
            INSERT INTO users ${ sql(newUser) };
        `    

        res.status(200).send('User Added');
        
    }
    catch (error) {
        console.error('Error occured in addUsers: ' + error.message);

    }

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