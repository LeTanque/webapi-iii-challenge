const express = require('express');
const cors = require('cors');
const router = require('./data/router.js');

const server = express();

server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
    res.send(`
        <h2>Lambda Hubs API</h>
        <p>Welcome to the Lambda Hubs API</p>
    `);
});

server.use('/api', router);

module.exports = server; 
