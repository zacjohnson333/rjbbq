const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs
const Item = require('./models/item');




mongoose.connect('mongodb://localhost:27017/rj-bbq', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});



const app = express();



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get('/', (req, res) => {
    res.render('home');
});

app.get('/menu', async (req, res) => {
    const items = await Item.find({});
    res.render('menu', { items });
});



app.listen(3000, () => {
    console.log('Serving on port 3000');
});