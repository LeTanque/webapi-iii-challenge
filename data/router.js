const express = require('express');

const userDB = require('./helpers/userDb.js');
const postDB = require('./helpers/postDb.js');

const router = express.Router();

// handles urls beginning with /api. 

// /api
// Get all users
router.get('/users', async (req, res) => {
    try {
        const allUsers = await userDB.get(req.query);
        res.status(200).json(allUsers);
    } 
    catch (error) {
        res.status(500).json({ error: "Users information could not be retrieved." });
    }
});


// Get single user by id
router.get('/users/:id', async (req, res) => {
    try {
        const userById = await userDB.getById(req.params.id);
        if (userById.length === 0) {  
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(userById);
        }
    } 
    catch (error) { 
        res.status(500).json({ error: "The user's information could not be retrieved." });
    }
});


// Get all posts by user by id. See helper function to understand how the db call is structured to do this.
// Similar in execution to a raw sql statement
router.get('/users/:id/posts', async (req, res) => {
    const checkUserExists = await userDB.getById(req.params.id);
    if (!checkUserExists) { // First, check if the user exists
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    try { // User exists, ok cool. Let's get their messages
        const userPosts = await userDB.getUserPosts(req.params.id);
        if (userPosts.length === 0) {  // User has no messages? OK, let's send a 200 and inform the client
            res.status(200).json({ message: "The user with the specified ID does not have any posts." });
        } else { // User exists and has messages. let's see em.
            res.status(200).json(userPosts);
        }
    } 
    catch (error) { // OMG SOMETHING BROKE
        res.status(500).json({ error: "The user's posts could not be retrieved." });
    }
});


// Add a new user to the usersdb
router.post('/users', async (req, res) => {
    if (!req.body.name) {  
        res.status(400).json({ message: "User name required!" });
    }
    try {
        const allUsers = await userDB.get(req.query);
        const userFiltered = allUsers.filter(user => user.name === req.body.name);
        if (userFiltered.length > 0) {
            res.status(409).json({ message: "Please choose a different name. User already exists." })
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error adding user!" });
    }
    try {
        const data = await userDB.insert(req.body);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Error adding user!" });
    }
});


// Delete a user from the usersdb
router.delete('/users/:id', async (req, res) => {
    const checkUserExists = await userDB.getById(req.params.id);
    if (!checkUserExists) { 
        res.status(404).json({ message: "The user with the specified ID does not exist. Cannot delete!" });
    }
    try {
        const usersDeleted = await userDB.remove(req.params.id);
        if (usersDeleted > 1) {
            res.status(200).json({ message: `${usersDeleted} users have been deleted` })    
        } else {
            res.status(200).json({ message: `${usersDeleted} user has been deleted` })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong deleting user!"})
    }
});


// Update user name
router.put('/users/:id', async (req, res) => {
    const checkUserExists = await userDB.getById(req.params.id);
    if (!checkUserExists) { 
        res.status(404).json({ message: "The user with the specified ID does not exist. Cannot update!" });
    }
    if (!req.body.name) {
        res.status(200).json({ message: "Nothing updated." })
    }
    try {
        const userUpdate = await userDB.update(req.params.id, req.body);
        res.status(200).json({ message: `${userUpdate} user has been updated` })
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong updating user!"})
    }
});








module.exports = router;
