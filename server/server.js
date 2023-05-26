const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const http = require("http");
const path = require("path");
const db = require("./db/db-connection.js");
// const { auth } = require("express-oauth2-jwt-bearer");

const app = express();
const PORT = process.env.PORT || 8080;
const apiKey = process.env.VITE_GIPHY_API_KEY;
const baseURL = "api.giphy.com/v1/gifs/search";

console.log("Api key is:", apiKey);

//Route for build directory
const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

app.use(cors());
app.use(express.json());

const token = process.env.ACCESS_TOKEN;
//console.log(token);

app.get("/", (req, res) => {
  // res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});
/****************************Giphy API************************ */
app.get("/api/giphy", async (req, res) => {
  try {
    const limit = 5;

    const response = await fetch(
      `${baseURL}/trending?api_key=${apiKey}&limit=${limit}`
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    res.status(500).json({ error: "Failed to fetch GIFs" });
  }
});

/******************** User Feature Routes **********************/
// Utility function to check if a user already exists

const getUser = async (sub) => {
  try {
    const result = await db.query(
      "SELECT * FROM user_table WHERE auth0_sub = $1",
      [sub]
    );
    if (result.rowCount === 1) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Maked sure
const checkUserExists = async (sub) => {
  return (await getUser(sub)) !== null;
};
// Create a function called get user, create query and a function
//This grabs user id

const getUserId = async (sub) => {
  const user = await getUser(sub);
  if (user !== null) {
    return user.user_id;
  } else {
    return null;
  }
};

//Check if user exist for sign up
app.post("/api/checkuser", async (req, res) => {
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
app.post("/api/newuser", async (req, res) => {
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

// Update user route
app.put("/api/users/:sub", async (req, res) => {
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

    res.json({
      message: "User data updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Error updating user data" });
  }
});

/******************* Home Feature Routes  *********************/
//Feed -> If user is a memeber select all post from that group

app.get("/api/feed/:sub", async (req, res) => {
  try {
    const sub = req.params.sub;

    const { rows: results } = await db.query(`
    SELECT * FROM group_post
    JOIN group_membership ON group_post.group_table_id = group_membership.gtid
    JOIN group_table ON group_membership.gtid = group_table.group_table_id
    JOIN user_table ON group_membership.uid = user_table.user_id
    WHERE user_table.auth0_sub = $1
  `, [sub]);
    res.json(results);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

/******************** Group Feature Routes **********************/
//Create group
app.post("/api/group", async (req, res) => {
  try {
    const newGroup = {
      group_name: req.body.group_name,
    };
    const result = await db.query(
      "INSERT INTO group_table (group_name) VALUES ($1) RETURNING *",
      [newGroup.group_name]
    );
    //intialized user id
    const userId = await getUserId(req.body.sub);
    console.log("User id:", userId, typeof userId);
    const groupId = result.rows[0].group_table_id;
    // Assuming you have the user_id available in the req.user object

    const membership = {
      gtid: groupId,
      uid: userId,
      is_admin: true,
    };

    await db.query(
      "INSERT INTO group_membership (gtid, uid, is_admin) VALUES ($1, $2, $3)",
      [membership.gtid, membership.uid, membership.is_admin]
    );

    res.status(200).json({ message: "Group created successfully" });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Group post

app.get("/api/allpost", async (req, res) => {
  try {
    const { rows: post } = await db.query(
      "SELECT * FROM group_post ORDER BY group_post_id DESC "
    );
    res.send(post);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

//users data for group post

// Get groups data based on id
app.get("/api/group/:groupId", async (req, res) => {
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
app.post("/api/group/:groupId", async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = await getUserId(req.body.userId); //get id from the request body --> used utitily function to grab users id
    console.log("This is the group id", groupId)
  
    console.log("This is the user id", userId)
    
    const newPost = {
      content: req.body.content,
      image: req.body.image,
    };
    // console.log("pleas work", newPost.user_id)
    // console.log("This is content", newPost.content)
    // console.log("user id:", userId);

    const query =
      "INSERT INTO group_post (image, content, user_id, group_table_id) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [newPost.image, newPost.content, userId, groupId]; // Assuming you have the authenticated user's ID
console.log("This is after the call", userId)
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
app.get("/api/membership/:groupId/:sub", async (req, res) => {
  try {
    const { groupId } = req.params;

    const userId = await getUserId(req.params.sub);
    // console.log("sub from membership:", req.params.sub);
    // console.log("req params fro  membership:", req.params);
    // console.log("userId from membership:", userId);
    // console.log("groupId from membership:", groupId);
    const result = await db.query(
      "SELECT * FROM group_membership WHERE gtid = $1 AND uid = $2",
      [groupId, userId]
    );
 
    console.log("Membership result:", result);
    const isMember = result.rowCount > 0;
    res.json({ isMember });
    console.log("Membership status:", isMember);
  } catch (error) {
    console.error("Error checking membership status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/******************** Membership Feature Routes **********************/

// Join Group
app.post("/api/group/:groupId/join", async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = await getUserId(req.body.sub); // Make sure userId is included in the request body

    console.log("userId:", userId);

    const result = await db.query(
      "INSERT INTO group_membership (gtid, uid) VALUES ($1, $2) RETURNING *",
      [groupId, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
});

// Delete Membership
app.delete("/api/group/:groupId/leave", async (req, res) => {
  try {
    const { groupId } = req.params; // Make sure userId is included in the request body
    const userId = await getUserId(req.body.sub);

    const result = await db.query(
      "DELETE FROM group_membership WHERE gtid = $1 AND uid = $2 RETURNING *",
      [groupId, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
});

/**************************** Spotify Feature Routes ******************/

app.get("/*", (req, res) => {
  console.log("/* is executing");
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
