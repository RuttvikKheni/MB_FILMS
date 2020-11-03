const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Routes = express.Router();

const clientDetail = require('./../models/ClientDetail');

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./public/Images/Clients/${req.body.cn}`);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + `_${req.body.clientName}_` + Date.now() + path.extname(file.originalname));
    }
});

uploAd = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024 * 20
    },
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|gif|png|ico/;
        const mimeType = fileType.test(file.mimetype);
        const extName = fileType.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        else {
            return cb("It's not a Image");
        }
    }
}).single('file');

Routes.get('/', (req, res, next) => {
    clientDetail.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            fs.readdir('./public/Images/Clients/', (err, files) => {
                if (err) {
                    next(err)
                } else {
                    res.render("Clients", {
                        Clients: data.map((val, i) => {
                            return val = { clientName: val.clientName, clientData: val.clientData }
                        }),
                        clientCounts: files,
                        login: true
                    })
                }
            });
        }
    });
});

Routes.post('/getdiscript', (req, res) => {
    if (req.body.clientName == "") {
        res.json({ status: "1", msg: "No Client Here, Pls Add Some Clients Info" });
    } else {
        clientDetail.find({ clientName: req.body.clientName }, (err, data) => {
            if (err) {
                console.log(err);
                res.json({ status: "0", msg: "Data not Found, pls Write Something" });
            } else {
                res.json({ status: "1", msg: data[0].clientData });
            }
        })
    }
});


Routes.post('/setdiscript', (req, res) => {
    console.log(req.body);
    clientDetail.findOneAndUpdate({ clientName: req.body.clientName }, { clientData: req.body.clientData }, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ status: "0", msg: "Data not Found, pls Write Something" });
        } else {
            console.log(data);
            res.json({ status: "1", msg: req.body.clientData });
        }
    });
});


Routes.post('/removeclient', (req, res) => {
    fs.unlink(`./public/Images/Clients/${req.body.clientName}`, (err) => {
        if (err) {
            console.log(err);
            obj = {}
            obj['status'] = 0;
            obj['msg'] = "*Client Not Found,Pls valid ClientName";
            res.end(JSON.stringify(obj));
        } else {
            clientDetail.findOneAndDelete({ clientName: req.body.clientName }, (err, result) => {
                if (err || result == null) {
                    obj = {}
                    obj['status'] = 0;
                    obj['msg'] = "*Client Not Found,Pls valid ClientName";
                    res.end(JSON.stringify(obj));
                } else {
                    obj = {}
                    obj['status'] = 1;
                    obj['msg'] = "*Client Removed";
                    res.end(JSON.stringify(obj));
                }
            })
        }
    });
});



Routes.post("/addclient", (req, res) => {

    fs.mkdir(`./public/Images/Clients/${req.body.clientName}`, (err) => {
        if (err) {
            res.json({
                status: 0,
                msg: "This Client Alredy Created :( "
            });
        } else {
            client = new clientDetail({
                clientName: req.body.clientName,
                clientData: req.body.clientData == null ? "Data not Found, pls Write Something" : req.body.clientData
            })
            client.save((err, data) => {
                if (err) {
                    console.log(err);
                    res.json({
                        status: 0,
                        msg: "*Client Not Added :( , Try Again",
                        error: err
                    });
                }
                else {
                    res.json({
                        status: 1,
                        msg: "*Client Added :)"
                    });
                }
            });
        }
    });
});



Routes.get("/viewImg", (req, res) => {
    console.log(req.query);
    fs.readdir(`./public/Images/Clients/${req.query.id}`, (err, files) => {
        if (err) {
            res.render('ViewMoreImg', { login: true, status: 0, msg: "Client Not Found" });

        } else {
            res.render('ViewMoreImg', { login: true, imgPath: "/public/Clients", clientName: req.query.id, imgName: files.map((val) => { return val }) });
        }
    });
});




Routes.post('/DeleteImg', (req, res) => {
    console.log(req.body);
    fs.unlink(`./public/Images/Clients/${req.body.ClientName}/${req.body.ImgName}`, (err) => {
        if (err) {
            res.json({ status: 0, msg: "Img Alredy Deleted :() " });
        } else {
            res.json({ status: 1, msg: "Img Deleted :) " });
        }
    });

});


Routes.post('/deleteClient', (req, res) => {

    fs.unlink(`./public/Images/Clients/${req.body.clientName}`, (err) => {
        if (err) {
            console.log(err);
            res.json({
                status: 0,
                msg: "Contact Kheni",
            });
        } else {
            res.json({
                status: 0,
                msg: "Clients Deleted",
            });
        }
    });
});


//=====upload img Processing=====================

Routes.post('/addImg', (req, res) => {
    uploAd(req, res, (err) => {
        if (err) {
            if (err == "It's not a Image") {
                obj = {}
                obj['status'] = 0;
                obj['msg'] = err;
                res.end(JSON.stringify(obj));
            } else {
                obj = {}
                obj['status'] = 0;
                obj['msg'] = "Img Must be 20MB, Try Again";
                res.end(JSON.stringify(obj));
            }
        } else {
            obj = {}
            obj['status'] = 1;
            obj['msg'] = "Image Uploaded";
            res.end(JSON.stringify(obj));
        }
    });
});





module.exports = Routes;