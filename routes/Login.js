const express = require('express');
const bcrypt = require('bcrypt');
const Routes = express.Router();

//--reuire files--

//--reuire files--
const User = require('./../models/User');

Routes.get("/", (req, res) => {
    req.session.login = false;
    res.render("index", {
        status: null,
        login: false
    });
});

Routes.get('/login', (req, res) => {
    req.session.login = false;
    res.render("index", {
        status: 0,
        mass: "Pls Login First :(",
        login: false
    });
});

Routes.post("/", (req, res) => {
    const email = req.body.email.toLowerCase();
    User.findOne({ email: email }).then((result) => {
        if (result == null) {
            res.render('index', {
                status: 2,
                login: false,
                mass: "Record Not Found",
            })
        } else {
            bcrypt.compare(req.body.password, result.password, (err, result) => {
                if (result) {
                    req.session.login = true;
                    // res.render('index', {
                    //     status: 1,
                    //     mass: 'Login Success :)'
                    // });
                    res.redirect(307, 'Profile');
                } else {
                    res.render('index', {
                        status: 0,
                        mass: "Password don't match",
                        login: false
                    });
                }
            });
        }
    }).catch((err) => {
        if (err) throw err;
    });

});


module.exports = Routes;