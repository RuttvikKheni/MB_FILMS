const e = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const Routes = express.Router();

const clientDetail = require('./../models/ClientDetail');

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

Routes.get('/photography', async (req, res) => {

    let obj = [
        {
            type: "Wedding",
            discription: "",
            imgs: []
        }, {
            type: "PreWedding",
            discription: "",
            imgs: []
        }, {
            type: "KidsShoots",
            discription: "",
            imgs: []
        }, {
            type: "FamilyShoots",
            discription: "",
            imgs: []
        }
    ];


    const data = obj.map((val, i) => {
        val.discription = fs.readFileSync('./data/' + val.type + 'Data.txt', 'utf-8');
        if (val.discription) {
            val.imgs = fs.readdirSync('./public/Images/' + val.type).map((vall) => {
                return `/public/${val.type}/${vall}`;
            });
        }
        return val;
    });
    res.json(data); 0
});


Routes.get('/photography/:type', (req, res) => {
    console.log(req.params);
    fs.readdir(`./public/Images/${req.params.type}`, (err, files) => {
        if (!err) {
            fs.readFile(`./data//${req.params.type}Data.txt`, 'utf-8', (err, data) => {
                if (!err) {
                    res.json({
                        type: req.params.type,
                        discription: data,
                        imgs: files.map((val) => {
                            return `/public/${req.params.type}/${val}`;
                        })
                    });
                }
            });
        }
    });
});



Routes.get('/clients', (req, res) => {

    fs.readdir('./public/Images/Clients/', async (err, files) => {
        let obj = [];
        obj = files;

        obj = await Promise.all(obj.map(async (val, i) => {
            val = {
                clientId: i,
                clientName: val,
                discription: "",
                imgs: []
            }

            const desc = await clientDetail.findOne({ clientName: val.clientName });

            if (desc) {
                val.discription = desc.clientData;
            }

            val.imgs = fs.readdirSync(`./public/Images/Clients/${val.clientName}`).map((vall) => {
                return `/public/Clients/${val.clientName}/${vall}`;
            });
            return val;

        }));

        res.send(JSON.stringify(obj));
    });

});



Routes.get('/clients/:client', (req, res) => {
    fs.readdir(`./public/Clients/${req.params.client}`, (err, files) => {
        if (!err) {
            fs.readFile(`./data/${req.params.client}Data.txt`, 'utf-8', (err, data) => {
                if (!err) {
                    res.json({
                        type: req.params.type,
                        discription: data,
                        imgs: files.map((val) => {
                            return `/public/${req.params.type}/${val}`;
                        })
                    });
                }
            });
        }
    });
});


module.exports = Routes;