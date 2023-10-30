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
    try {
        let resDB = await sql`
            SELECT * FROM users WHERE id = ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in getUsersById: ' + error.message);
    }
};


// Post
const addUsers = async (req, res) => {
    try {
        let resDB = await sql`
            INSERT INTO users;
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in addUsers: ' + error.message);
    }
}


// Put
const updateUsersById = async (req, res) => {
    try {
        let resDB = await sql`
            UPDATE users SET user_name = ${req.body.user_name}, position= ${req.body.position}, user_password= ${req.body.user_password} WHERE id= ${req.params.id}
        `
        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in updateUsersById: ' + error.message);
    }
}


// Delete
const deleteUsersById = async (req, res) => {
    // doesn't work bc id associated with other table rn
    try {
        let resDB = await sql`
            DELETE FROM users WHERE id= ${req.params.id};
        `

        res.json(resDB);

    }
    catch (error) {
        console.error('Error occured in deleteUsersById: ' + error.message);
    }
}


module.exports = {
    getUsersAll,
    getUsersById,
    addUsers,
    updateUsersById,
    deleteUsersById,

}