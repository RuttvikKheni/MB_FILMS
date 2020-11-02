const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Routes = express.Router();

const homeImg = require('./../models/HomeImg.js');
const { port } = require('./../config/config');



storage = multer.diskStorage({
    destination: './public/Images/Profile/Home',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_SliderImg_" + Date.now() + path.extname(file.originalname));
    }
});

uplOad = multer({
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
}).single('fileImg');

let count = 0;

Routes.get("/", (req, res) => {
    homeImg.find({}, (err, result) => {
        if (err) {
            res.render("Profile", {
                login: true,
                port: port,
                status: 1,
                mass: "Contact Kheni",
                count: count,
                imgName: result.map((result) => {
                    return result.imgName;
                }),
                imgData: result.map((result) => {
                    return result.imgData;
                })
            });
        } else {
            res.render("Profile", {
                login: true,
                port: port,
                status: null,
                count: count,
                imgName: result.map((result) => {
                    return result.imgName;
                }),
                imgData: result.map((result) => {
                    return result.imgData;
                })
            });
        }
    });
});

Routes.post("/", (req, res) => {
    homeImg.find({}, (err, result) => {
        if (err) {
            res.render("Profile", {
                login: true,
                port: port,
                status: 1,
                mass: "Contact Kheni",
                count: count,
                imgName: result.map((result) => {
                    return result.imgName;
                }),
                imgData: result.map((result) => {
                    return result.imgData;
                })
            });
        } else {
            res.render("Profile", {
                login: true,
                port: port,
                status: null,
                count: count,
                imgName: result.map((result) => {
                    return result.imgName;
                }),
                imgData: result.map((result) => {
                    return result.imgData;
                })
            });
        }
    });
});



Routes.get("/addImg", (req, res) => {
    res.render("AddHomeImg", {
        login: true,
        status: null
    });
});


Routes.post("/addImg", (req, res) => {
    uplOad(req, res, (err) => {
        if (err) {
            obj = {};
            obj['status'] = 0;
            obj['error'] = err.message;
            res.send(obj)
        } else {
            // console.log(req.file);
            homeimg = new homeImg({
                imgData: req.body.imgData,
                imgName: req.file.filename
            });
            homeimg.save().then((data) => {
                obj = {};
                obj['status'] = 1;
                obj['imgName'] = data.imgName;
                res.send(obj)
                console.log(data.imgData);
            }).catch(() => {
                obj = {};
                obj['status'] = 0;
                obj['error'] = err.message;
                res.send(obj)
            });
        }
    });
});

Routes.get("/updateImg?:id", (req, res) => {
    homeImg.find({ imgName: req.query.id }, (err, result) => {
        if (err) throw err;
        if (result == "") {
            res.render("UpdateHomeImg", {
                login: true,
                port: port,
                status: 0,
                mass: "Image Not Found :(",
                updateImg: req.query.id
            });
        } else {
            res.render("UpdateHomeImg", {
                login: true,
                port: port,
                status: null,
                updateImg: req.query.id + "|" + result[0].imgData
            });
        }
    });


});

Routes.post("/updateImg", (req, res) => {

    uplOad(req, res, (err) => {
        if (err) {
            obj = {};
            obj['status'] = 0;
            obj['msg'] = err;
            console.log(obj);
            res.send(obj)
        } else {
            homeImg.findOneAndUpdate({ imgName: req.body.imgName }, { imgName: req.file.filename, imgData: req.body.imgData }, (err, result) => {
                if (err) {
                    obj = {};
                    obj['status'] = 0;
                    obj['msg'] = "Try Again";
                    console.log(obj);
                    res.send(obj)
                } else {
                    fs.unlink(`./public/Images/Profile/Home/${req.body.imgName}`, (err) => {
                        if (err) {
                            obj = {};
                            obj['status'] = 0;
                            obj['msg'] = "Image Alrady Updated";
                            console.log(obj);
                            res.send(obj)
                        } else {
                            obj = {};
                            obj['status'] = 1;
                            obj['msg'] = "Image Updated :) ";
                            console.log(obj);
                            res.send(obj)
                        }
                    });
                }
            });

        }
    });


});



Routes.get("/deleteImg?:id", (req, res) => {
    console.log(req.query);
    res.end("end");
});

module.exports = Routes;