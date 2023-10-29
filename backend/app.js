//express application
const express = require('express');
const app = express();

//packages
require('dotenv').config();

//database
const sql = require('./database/dbConfig');

app.get('/', async (req, res) => {
    //example code for querying database and return response back to client
    let resDB = await sql`
        SELECT * FROM inventory;
    `
    res.json(resDB);
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})