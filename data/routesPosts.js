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





module.exports = routesPosts;