const express = require('express');

const PostDB = require('./helpers/postDb.js');

const routesPosts = express.Router();


// Server.js handles the /api path. Router.js handles the posts path


// Get all the posts
routesPosts.get('/', async (req, res) => {
    try {
        const posts = await PostDB.get(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "The posts could not be retrieved." });
    }
});


// Get single post by id
routesPosts.get('/:id', async (req, res) => {
    try {
        const postById = await PostDB.getById(req.params.id);
        if (postById.length === 0) {  
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(postById);
        }
    } 
    catch (error) { 
        res.status(500).json({ error: "The post could not be retrieved." });
    }
});


// Add a new post as user by id
routesPosts.post('/', async (req, res) => {
    if (!req.body.text) {
        return res.status(409).json({ message: "Post cannot be blank!" });
    }
    if (!req.body.user_id) {
        return res.status(409).json({ message: "Please include user id." });
    }
    try {
        const data = await PostDB.insert(req.body);
        res.status(200).json(`Successfully added post as user_id: ${data.user_id}`);
    }
    catch (error) {
        res.status(500).json({ error: "Error adding post!" });
    }
});


// Delete a post from the db
routesPosts.delete('/:id', async (req, res) => {
    const checkPostExists = await PostDB.getById(req.params.id);
    if (!checkPostExists) { 
        return res.status(404).json({ message: "The post with ID does not exist. Cannot delete!" });
    }
    try {
        const postDeleted = await PostDB.remove(req.params.id);
        if (postDeleted > 1) {
            res.status(200).json({ message: `${postDeleted} posts have been deleted` })
        } else {
            res.status(200).json({ message: `${postDeleted} post has been deleted` })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong deleting post!"})
    }
});


// Update post
routesPosts.put('/:id', async (req, res) => {
    try {
        const checkPostExists = await PostDB.getById(req.params.id);
        if (!checkPostExists) { 
            return res.status(404).json({ message: "The post with the specified ID does not exist. Cannot update!" });
        } else if (!req.body.text) {
            return res.status(200).json({ message: "Nothing updated." })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong updating post!"})
    }
    try {
        const postUpdate = await PostDB.update(req.params.id, req.body);
        res.status(200).json({ message: `${postUpdate} post has been updated` });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong updating post!"});
    }
});



module.exports = routesPosts;
