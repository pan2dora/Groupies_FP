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


app.get('/allpost', async (req,res) => {

    try{

        const  {rows: post} = await db.query('SELECT * FROM group_post ORDER BY group_post_id DESC ');
        res.send(post)
    }
    catch (e) {
        return res.status(400).json({ e });
    }
});

//Get groups data based based on id 
app.get('/group/:groupId', async (req,res) => {


    try{

        const groupId = req.params.groupId;
        const {rows: post} = await db.query('SELECT * FROM group_table JOIN group_post ON group_table.group_table_id = group_post.group_table_id WHERE group_table.group_table_id = $1',[groupId])
        //'SELECT group_name FROM group_table INNER JOIN group_post ON group_table.group_table_id = group_post.group_table_id WHERE group_post.group_table_id = $1',[groupId]);
       console.log(post)
        res.json(post)
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});


//Post to group 
app.post('/group/:groupId/post', async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const userId = req.params.userId;
        const newPost = {
            content: req.body.content,
            image: req.body.image
        };

        const query = 'INSERT INTO group_post (image, content, user_id, group_table_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [newPost.image, newPost.content, userId, groupId]; // Assuming you have the authenticated user's ID

        const result = await db.query(query, values);

        const postedGroup = result.rows[0];

        console.log(postedGroup);
        res.json(postedGroup);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }
});






app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});