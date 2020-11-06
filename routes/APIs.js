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
    // res.end("hello");
});



Routes.get('/clients', (req, res) => {


    fs.readdir('./public/Images/Clients/', (err, files) => {
        if (!err) {
            // var options = [];
            // files.forEach(function (val) {
            //     fs.readdir(`./public/Images/Clients/${val}`, (error, file) => {
            //         options.push({ clients: val, images: file, description: "description" });
            //     });
            // });
            // console.log(options);

            var arr = [];
            var obj = {};
            files.forEach(function (val) {
                fs.readdir(`./public/Images/Clients/${val}`, (error, file) => {
                    obj = { clients: val, images: file, description: "description" };
                    arr.push(obj);
                });
            });

            console.log(arr);



            // files.map((val, i) => {
            //     arr = {};
            //     fs.readdir(`./public/Images/Clients/${val}`, (error, file) => {
            //         arr['clients'] = val;
            //         arr['images'] = file;
            //         arr['description'] = "Description";
            //     });
            //     console.log(arr);
            //     obj.push(arr);
            // });
            // console.log(obj);
        }
    });


    res.end('helo');
    // fs.readdir('./public/Images/Clients/', (err, files) => {
    //     if (!err) {
    //         let obj = [];
    //         obj = files.map((val, i) => {
    //             val = {
    //                 clientId: i,
    //                 clientName: val,
    //                 discription: "",
    //                 imgs: []
    //             }
    //             clientDetail.find({ clientName: val }, (err, data) => {
    //                 console.log(data);
    //                 return data.clientDetail;
    //             });
    //             fs.readdir(`./public/Images/Clients/${val}`, (error, file) => {
    //                 file.map((vall) => {
    //                     return `/public/Clients/${val}/${vall}`;
    //                 });
    //             });
    //             console.log(val);
    //             return val;
    //         });
    //         // res.json(obj);
    //     }
    // });
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