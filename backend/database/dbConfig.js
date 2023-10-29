const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
    host: 'csce-315-db.engr.tamu.edu',
    database: 'csce315331_08p_db',
    username: process.env.USER,
    password: process.env.PASSWORD
})

module.exports = sql;