const postgres = require('postgres');
require('dotenv').config( { override: true } );

const sql = postgres({
    host: 'csce-315-db.engr.tamu.edu',
    database: 'csce315331_08p_db',
    username: process.env.USER,
    password: process.env.PASSWORD
    
})

/*
* Note:
* to use dotenv (if actual environment variables are not appropriate username and password)
* run npm install in terminal
* create a file title '.env' 
* Fill in data with the form KEY=VALUE (USER='' and PASSWORD='')
*
* Appendix:
* Overriding actual environemnt variables with values in .env (see line 2)
*/
//test

module.exports = sql;