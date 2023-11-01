//express application
const express = require('express');
const app = express();

//packages
require('dotenv').config();

const cors=require("cors");
app.use(cors())

app.use(express.json());

app.use(express.json());
//database
const sql = require('./database/dbConfig');

//routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const drinksRoute = require('./routes/drinks');
app.use('/drinks', drinksRoute);

const inventoryRoute = require('./routes/inventory');
app.use('/inventory', inventoryRoute);

const itemRoute = require('./routes/item');
app.use('/item', itemRoute);

const ordersRoute = require('./routes/orders');
app.use('/orders', ordersRoute);

// app.get('/', async (req, res) => {
//     try {
//         let resDB = await sql`
//             SELECT * FROM users;
//         `

//         res.json(resDB);

//     }
//     catch (error) {
//         console.error('Error occured in Function Name: ' + error.message);

//     }

// });


app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

});