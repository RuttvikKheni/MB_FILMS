const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
var session = require('express-session')
const app = express();

// config file
const { port, secret } = require('./config/config');

// session
app.use(session({
    secret: secret,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    },
    login: false
}));

// config file
const CheckAuth = require('./models/Check-Auth');
const CheckAuh = require('./models/Check-Auth');

// const port = process.env.PORT || 3000;

//----view engine---
app.set("view engine", "ejs");

//--morgan--
app.use(morgan('dev'));

//--public Folders--
app.use('/public', express.static(path.join(__dirname, 'public/Images')))


//--bodyparser--
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//--db--
mongoose.connect("mongodb+srv://MEETBORAD:MEETBORAD@cluster0.e2k1g.mongodb.net/mb_films?retryWrites=true&w=majority", {
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;


//--Routes-------
app.use('/', require('./routes/Login'));
app.use('/profile', CheckAuh, require('./routes/Profile'));
app.use('/about', CheckAuh, require('./routes/AdminInfo'));
app.use('/wedding', CheckAuh, require('./routes/Wedding'));
app.use('/prewedding', CheckAuh, require('./routes/PreWedding'));
app.use('/kidsshoots', CheckAuh, require('./routes/KidsShoots'));
app.use('/familyshoots', CheckAuh, require('./routes/FamilyShoots'));
app.use('/contact', CheckAuh, require('./routes/Contact'));

// app.use(function (err, req, res, next) {
//     res.status(500).send(err)
// })

// APIs
app.use('/api', require('./routes/APIs'));


//--logout Routes--
app.get('/logout', (req, res) => {
    console.log(req.session.login)
    req.session.login = false;
    console.log(req.session.login)
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`your website is Running in http://localhost:${port}/`);
});