const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const path = require("path");
const db = require("./db/db-connection.js");
const { auth } = require("express-oauth2-jwt-bearer");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const token = process.env.ACCESS_TOKEN;
//console.log(token);


app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});



/******************** User Feature Routes **********************/
// Utility function to check if a user already exists
const checkUserExists = async (sub) => {
  try {
    const result = await db.query(
      "SELECT * FROM user_table WHERE auth0_sub = $1",
      [sub]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//Check if user exist for sign up 
app.post("/checkuser", async (req, res) => {
  try {
    const { sub } = req.body;
    const userExists = await checkUserExists(sub);
    res.json(userExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Create new user
app.post("/newuser", async (req, res) => {
  try {
    const { email, given_name, picture, sub } = req.body;

    console.log("Received user data:", { email, given_name, picture, sub });

    try {
      const userExists = await checkUserExists(sub);

      if (userExists) {
        // User already exists, return existing user data
        const existingUser = await db.query(
          "SELECT * FROM user_table WHERE auth0_sub = $1",
          [sub]
        );
        console.log("User already exists:", existingUser.rows[0]);

        res.json(existingUser.rows[0]);
        return;
      }

      // Insert the new user into the user_table
      const result = await db.query(
        "INSERT INTO user_table (email, given_name, picture, auth0_sub) VALUES ($1, $2, $3, $4) RETURNING *",
        [email, given_name, picture, sub]
      );

      const newUser = result.rows[0];
      console.log("User Added:", newUser);
      res.json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error: "Error adding user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(421).json({ error: "Invalid request" });
  }
});


//Signup/Update user profile
// Validation middleware
const validateDateOfBirth = (req, res, next) => {
  const { date_of_birth } = req.body;

  // Validate the date format
  if (!isValidDateFormat(date_of_birth)) {
    return res.status(400).json({ error: "Invalid date format for date_of_birth" });
  }

  next();
};

// Helper function to validate date format
function isValidDateFormat(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
}

// Update user route
// Update user route
// Update user route
// Add middleware to parse request body
app.use(express.json());

// Update user route
app.put("/users/:sub", async (req, res) => {
  try {
    const sub = req.params.sub;
    const { displayName, pronouns, dateOfBirth, picture } = req.body;

    console.log("Received request body:", req.body);

    const userExists = await checkUserExists(sub);

    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Updating user data:", {
      displayName,
      pronouns,
      dateOfBirth,
      picture,
      sub,
    });

    const result = await db.query(
      "UPDATE user_table SET displayname = $1, pronouns = $2, date_of_birth = $3, picture = $4 WHERE auth0_sub = $5 RETURNING *",
      [displayName, pronouns, dateOfBirth, picture, sub]
    );

    console.log("User data updated successfully", result.rows[0]);

    res.json({ message: "User data updated successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Error updating user data" });
  }
});





/******************** Group Feature Routes **********************/

app.post("/group", async (req, res) => {
  try {
    const newGroup = {
      group_name: req.body.group_name,
    };
    const result = await db.query(
      "INSERT INTO group_table (group_name) VALUES ($1) RETURNING *",
      [newGroup.group_name]
    );

    //console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

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

//Create and Delete Memberships
//Check membership
app.get("/membership/:groupId/:userId", async (req, res) => {
  try {
    const { groupId, userId } = req.params;

    const result = await db.query(
      "SELECT EXISTS(SELECT 1 FROM membership WHERE gtid = $1 AND uid = $2)",
      [groupId, userId]
    );

    const isMember = result.rows[0].exists;
    res.json({ isMember });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Create Membership
app.post("/membership", async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const result = await db.query(
      "INSERT INTO membership (gtid, uid) VALUES ($1, $2) RETURNING *",
      [groupId, userId]
    );

    //console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// Delete Membership
app.delete("/membership", async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const result = await db.query(
      "DELETE FROM membership WHERE gtid = $1 AND uid = $2 RETURNING *",
      [groupId, userId]
    );

    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
