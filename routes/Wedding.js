const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Routes = express.Router();

const { port } = require('./../config/config');

storage = multer.diskStorage({
    destination: './public/Images/Wedding',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_Wedding_" + Date.now() + path.extname(file.originalname));
    }
});

upload = multer({
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



Routes.get("/", (req, res) => {
    fs.readdir('./public/Images/Wedding', (err, data) => {
        res.render('UploadPhotography', {
            login: true,
            status: null,
            PhotoType: "Upload To Wedding",
            uploadRoutes: "/wedding/",
            imgRoutes: `/public/Wedding/`,
            imgData: data,
            Dipart: "Weddings Images"
        });
    });
});


Routes.post("/uploadImg", (req, res) => {
    console.log(req.file);
    upload(req, res, (msg) => {
        console.log(req.file);
        fs.readdir('./public/Images/Wedding', (err, data) => {
            res.render('UploadPhotography', {
                login: true,
                status: msg ? 0 : 1,
                mass: msg ? msg : "File Uploaded :)",
                PhotoType: "Upload To Wedding",
                uploadRoutes: "/wedding/",
                imgRoutes: `/public/Wedding/`,
                imgData: data,
                Dipart: "Weddings Images"
            });
        });
    })

});

Routes.get("/deleteImg?:id", (req, res) => {
    fs.unlink(`./public/Images/Wedding/${req.query.id}`, (err) => {
        if (err) {
            fs.readdir('./public/Images/Wedding', (err, data) => {
                console.log(data);
                res.render('UploadPhotography', {
                    login: true,
                    status: 2,
                    mass: "Img Already Deleted :)",
                    PhotoType: "Upload To Wedding",
                    uploadRoutes: "/wedding/",
                    imgRoutes: `/public/Wedding/`,
                    imgData: data,
                    Dipart: "Weddings Images"
                });
            });
        }
        else {
            fs.readdir('./public/Images/Wedding', (err, data) => {
                console.log(data);
                res.render('UploadPhotography', {
                    login: true,
                    status: 1,
                    mass: "Img Deleted :)",
                    PhotoType: "Upload To Wedding",
                    uploadRoutes: "/wedding/",
                    imgRoutes: `/public/Wedding/`,
                    imgData: data,
                    Dipart: "Weddings Images"
                });
            });
        }
    });
});


Routes.get("/getdiscript", (req, res) => {
    fs.readFile('./data/WeddingData.txt', 'utf8', (err, data) => {
        if (err) {
            const obj = {};
            obj["status"] = "0";
            obj["data"] = err;
            res.send(obj);
        } else {
            const obj = {};
            obj["status"] = "1";
            obj["data"] = data;
            res.send(obj);
        }
    });
});


Routes.post("/postdiscript", (req, res) => {
    const { discript } = req.body;
    console.log(discript);
    fs.writeFile("./data/WeddingData.txt", discript, (err) => {
        if (err) {
            const obj = {};
            obj["status"] = "0";
            obj["msg"] = "Error";
            obj["data"] = discript;
            res.send(obj);
        } else {
            const obj = {};
            obj["status"] = "1";
            obj["msg"] = "Text has Been Changed";
            obj["data"] = discript;
            res.send(obj);
        }
    });
});


// dcdscdsccdscsdcsdcsdcdscsdcsdcdscsdcdscdcdscdscscdscdsc


module.exports = Routes;