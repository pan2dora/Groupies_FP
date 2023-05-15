const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for students in the endpoint '/api/students'
app.get('/user', async (req, res) => {
    try {
        const { rows: users } = await db.query('SELECT * FROM user_table ORDER BY user_id ASC');
        res.send(users);
    } catch (e) {
        return res.status(400).json({ e });
    }
});


//Group post

app.get('/group/:groupid')







app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});