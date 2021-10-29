const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/menu', async (req, res) => {
    const item = new Item({
        title: 'Brisket Sandwhich',
        price: 15,
        img: 'https://media.istockphoto.com/photos/braised-beef-short-rib-sandwich-on-a-brioche-bun-picture-id1216279532?k=20&m=1216279532&s=612x612&w=0&h=PP1V5b9YPb6K264vEZG9jVR2htq9FxisjlJ3ZSfDm1Q=',
        description: 'A hefty portion of smoked brisket served on a brioche bun along with a pickle spear and a one side of your choice.'
    });
    await item.save();
    res.send(item);
});


app.listen(3000, () => {
    console.log('Serving on port 3000');
});