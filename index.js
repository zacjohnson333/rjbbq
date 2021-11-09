if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');    // an engine that makes sense of ejs
const bodyParser = require('body-parser');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const Item = require('./models/item');

const menu = require('./routes/menu');
const home = require('./routes/home');
const catering = require('./routes/catering');
const story = require('./routes/story');
const next = require('./routes/next');
const contact = require('./routes/contact');
const contactSuccess = require('./routes/contact-success');
const contactFailure = require('./routes/contact-failure');



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

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))          // do I even need body parser package?  I think so? but it is 
// app.use(express.json());



app.use('/', home);
app.use('/menu', menu);
app.use('/catering', catering);
app.use('/story', story);
app.use('/next', next);
app.use('/contact', contact);
app.use('/contact-success', contactSuccess);
app.use('/contact-failure', contactFailure);


app.all('*', (req, res, next) => {                  // remember, since we are passing someting to next(), it will hit our basic error handler
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {          // basic error handler
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', { err });
})



app.listen(3000, () => {
    console.log('Serving on port 3000');
});