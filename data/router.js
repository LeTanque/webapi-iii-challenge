const express = require('express');
const UserDB = require('./helpers/userDb.js');
const routesUsers = require('./routesUser');
const routesPosts = require('./routesPosts');

const router = express.Router();

router.use(express.json());
router.use('/users', routesUsers);
router.use('/posts', routesPosts);


// handles urls beginning with /api.




module.exports = router;

