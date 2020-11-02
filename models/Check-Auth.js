const { response } = require("express");

function CheckAuh(req, res, next) {

    console.log()

    if (req.session.login === true) {
        next();
    } else {
        res.redirect(307, '/login');
    }

};

module.exports = CheckAuh;