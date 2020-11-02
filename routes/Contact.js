const Routes = require("express").Router();

Routes.get('/', (req, res) => {
    res.render('ContactDetail', {
        login: true
    });
});

module.exports = Routes;