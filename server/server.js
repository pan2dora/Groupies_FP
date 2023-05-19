const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// create the get request for students in the endpoint '/api/students'
app.get("/user", async (req, res) => {
  try {
    const { rows: users } = await db.query(
      "SELECT * FROM user_table ORDER BY user_id ASC"
    );
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});
/******************** Group Feature Routes **********************/

//Group post

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

//Get groups data based based on id
app.get("/group/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { rows: post } = await db.query(
      "SELECT * FROM group_table JOIN group_post ON group_table.group_table_id = group_post.group_table_id WHERE group_table.group_table_id = $1",
      [groupId]
    );
    //'SELECT group_name FROM group_table INNER JOIN group_post ON group_table.group_table_id = group_post.group_table_id WHERE group_post.group_table_id = $1',[groupId]);
    console.log(post);
    res.json(post);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//Post to group
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

//Create group
app.post("/group", async (req, res) => {
  try {
    const newGroup = {
      group_name: req.body.group_name,
    };
    const result = await db.query(
      "INSERT INTO group_table (group_name) VALUES ($1) RETURNING *",
      [newGroup.group_name]
    );

    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//Group membership 
//Check if user is a member of a group 
app.get('/group/:groupId/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const groupId = req.params.groupId;
  
      const query = 'SELECT is_member FROM group_membership WHERE uid = $1 AND gtid = $2';
      const values = [userId, groupId];
  
      const result = await db.query(query, values);
      if (result.rows.length > 0) {
        res.json({ isMember: result.rows[0].is_member }); //Return true or false if user is a member of the group
      } else {
        res.json({ isMember: false });
      }
    } catch (error) {
      console.error('Error checking membership:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //Updaye group membership
 

    
    


}catch(e){
    console.log(e);
    return res.status(400).json({e})
}
  })






app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
