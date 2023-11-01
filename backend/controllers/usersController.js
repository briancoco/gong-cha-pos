const sql = require('../database/dbConfig');
const moment = require('moment');

// Get

// Template http://.../users
const getUsersAll = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM users;
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occured in getUsersAll: ' + error.message);
        res.status(400).json({});

    }

};

// Template http://.../users/id
const getUsersById = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT * FROM users WHERE id = ${ req.params.id };
        `;

        res.status(200).json(resDB);

    }
    catch (error) {
        console.error('Error occured in getUsersById: ' + error.message);
        res.status(400).json({});

    }
    
};


// Template http://.../users/login
//          body { user_name : ..., user_password : ... }
// Note: used to verify users. Returns only role or {} (and 404 error) if user does not exist
const getUsersPosition = async (req, res) => {
    try {
        let resDB = await sql`
            SELECT position FROM users WHERE user_password = ${ req.body.user_password } AND user_name = ${ req.body.user_name };
        `;

        if (resDB.length) {
            res.status(200).json(resDB);

        }
        else {
            res.status(404).json({});

        }

    }
    catch (error) {
        console.error('Error occured in getUsersPosition: ' + error.message);
        res.status(400).json({});

    }
    
};

// Post

// Template http://.../users
//          body { position : ..., date_hired : ..., user_name : ..., user_password : ... }
// Note: position and date_hired are not required and are set to: "Customer" and the current datetime respectively
const addUsers = async (req, res) => {
    try {
        let newUser = {};

        newUser['position'] = req.body.position || 'Customer' ;
        newUser['date_hired'] = req.body.date_hired || moment().format("YYYY-MM-DD");
        newUser['user_name'] = req.body.user_name;
        newUser['user_password'] = req.body.user_password;

        await sql`
            INSERT INTO users ${ sql(newUser) };
        `;    

        res.status(200).send('User Added');
        
    }
    catch (error) {
        console.error('Error occured in addUsers: ' + error.message);
        res.status(400).json({});

    }

};


// Put

// Template http://.../users/id
//          body { /*Only key-value pairs that are going to be changed*/ }
const updateUsersById = async (req, res) => {
    const updates = req.body;

    try {
        await sql`
            UPDATE users SET ${ sql(updates) } WHERE id= ${ req.params.id };
        `;

        res.status(200).send('User Updated');

    }
    catch (error) {
        console.error('Error occured in updateUsersById: ' + error.message);
        res.status(400).json({});

    }

};


// Delete

// Template http://.../users/id
const deleteUsersById = async (req, res) => {
    // doesn't work bc id associated with other table rn // TODO
    try {
        await sql`
            DELETE FROM users WHERE id= ${ req.params.id };
        `;

        res.status(200).send('User Deleted');

    }
    catch (error) {
        console.error('Error occured in deleteUsersById: ' + error.message);
        res.status(400).json({});

    }

};


module.exports = {
    getUsersAll,
    getUsersById,
    addUsers,
    updateUsersById,
    deleteUsersById,
    getUsersPosition,

}