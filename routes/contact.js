const express = require('express');
const router = express.Router();
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs


router.get('/', async (req, res) => {       // need to make a post route for contact? Not sure where to send it yet...
    res.render('pages/contact');
});

module.exports = router;