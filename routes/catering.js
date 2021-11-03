const express = require('express');
const router = express.Router();
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs


router.get('/', async (req, res) => {
    res.render('pages/catering');
});

module.exports = router;