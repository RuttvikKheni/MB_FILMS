const express = require('express');
const fs = require('fs');
const path = require('path');
const Routes = express.Router();


// Routes.get('/profile', (req, res) => { });

Routes.get('/about', (req, res) => {
    fs.readdir('./public/Images/Profile/Admin', (err, files) => {
        console.log(err, files);
        obj = [];
        obj = files.map((val, i) => {
            return `http://localhost:3000/public/Profile/Admin/${val}`;
        })
        res.send(obj);
    });
});

Routes.get('/photography', (req, res) => {

    let obj = [
        {
            type: "Weddings",
            discription: "It's Weddings Images Weddings Images",
            imgs: ["https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://www.irdes.fr/imgs2017/images/about-imgs.jpg",]
        }, {
            type: "PreWeddings",
            discription: "It's PreWeddings Images PreWeddings Images",
            imgs: ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg",]
        }, {
            type: "KidsShoots",
            discription: "It's KidsShoots KidsShoots",
            imgs: ["https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://www.irdes.fr/imgs2017/images/about-imgs.jpg",]
        }, {
            type: "FamilyShoots",
            discription: "It's FamilyShoots FamilyShoots",
            imgs: ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg",]
        }
    ];
    res.end(JSON.stringify(obj));

});


Routes.get('/photography/:type', (req, res) => {

    let obj = {};
    obj['type'] = req.params.type
    obj['discription'] = `It's ${req.params.type} Images ${req.params.type} Images`
    obj['imgs'] = ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg",]
    res.end(JSON.stringify(obj));

});



Routes.get('/clients', (req, res) => {

    let obj = [
        {
            clientId: 1,
            clientName: "Weddings",
            discription: "It's Weddings Images Weddings Images",
            imgs: ["https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://www.irdes.fr/imgs2017/images/about-imgs.jpg",]
        }, {
            clientId: 2,
            clientName: "PreWeddings",
            discription: "It's PreWeddings Images PreWeddings Images",
            imgs: ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg",]
        }, {
            clientId: 3,
            clientName: "KidsShoots",
            discription: "It's KidsShoots KidsShoots",
            imgs: ["https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg", "https://www.irdes.fr/imgs2017/images/about-imgs.jpg",]
        }, {
            clientId: 4,
            clientName: "FamilyShoots",
            discription: "It's FamilyShoots FamilyShoots",
            imgs: ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg",]
        }
    ];
    res.end(JSON.stringify(obj));

});



Routes.get('/clients/:client', (req, res) => {

    let obj = {};
    obj['type'] = req.params.type
    obj['discription'] = `It's ${req.params.type} Images ${req.params.type} Images`
    obj['imgs'] = ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg", "https://restaurant-table-des-faubourgs.com/assets/components/tdf/js/fullPage-master/examples/imgs/bg3.jpg",]
    res.end(JSON.stringify(obj));

});


module.exports = Routes;