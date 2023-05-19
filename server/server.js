const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require('http');
const path = require("path");
const db = require("./db/db-connection.js");
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const token = process.env.ACCESS_TOKEN;
console.log(token)

app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

//add a new user
app.post('/user', async (req, res) => {
  try {
      const { email,family_name,picture } = req.body;
      console.log("request body", req.body);
      const result = await db.query(
          'INSERT INTO user_table (email, family_name, picture) VALUES($1, $2, $3 ) ON CONFLICT DO NOTHING RETURNING *',
          [email, family_name, picture],
      );
      console.log(result.rows[0]);
      // res.json(result.rows[0] ?? {});

      const { rows: user  } = await db.query('SELECT * FROM ready_users WHERE user_email=$1', [email]);
      res.send(user);

  } catch (e) {
      console.log(e);
      return res.status(400).json({ e });
  }

});




// app.get("/user", async (req, res) => {
//   try {
//     const { rows: users } = await db.query(
//       "SELECT * FROM user_table ORDER BY user_id ASC"
//     );
//     res.send(users);
//   } catch (e) {
//     return res.status(400).json({ e });
//   }
// });

/******************** Group Feature Routes **********************/
//Create Groups
app.post('/group', async (req, res)=>{
  try{
      const newGroup ={
          group_name: req.body.group_name,
      };
      const result = await db.query('INSERT INTO group_table (group_name) VALUES ($1) RETURNING *',[newGroup.group_name],);
  
  
  console.log(result.rows[0]);
  res.json(result.rows[0]);
  
  } catch (e) {
  console.log(e);
  return res.status(400).json({ e });
  }
  
  
  })


// Group post

app.get("/allpost", async (req, res) => {
  try {
    const { rows: post } = await db.query(
      "SELECT * FROM group_post ORDER BY group_post_id DESC "
    );
    res.send(post);
  } catch (e) {
    return res.status(400).json({ e });
  }
});




// Get groups data based on id
app.get("/group/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { rows: post } = await db.query(
      "SELECT * FROM group_table JOIN group_post ON group_table.group_table_id = group_post.group_table_id WHERE group_table.group_table_id = $1",
      [groupId]
    );
    console.log(post);
    res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// Post to group
app.post("/group/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    const newPost = {
      content: req.body.content,
      image: req.body.image,
    };

    const query =
      "INSERT INTO group_post (image, content, user_id, group_table_id) VALUES ($1, $2, $3, $4) RETURNING *";
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
