const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Routes = express.Router();

const { port } = require('./../config/config');

storage = multer.diskStorage({
    destination: './public/Images/KidsShoots',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_KidsShoot_" + Date.now() + path.extname(file.originalname));
    }
});

uPload = multer({
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
    fs.readdir('./public/Images/KidsShoots', (err, data) => {
        res.render('UploadPhotography', {
            login: true,
            status: null,
            PhotoType: "Upload To Kids Shoots",
            uploadRoutes: "/kidsshoots/",
            imgRoutes: `http://localhost:${port}/public/KidsShoots/`,
            imgData: data,
            Dipart: "KidsShoots Images"
        });
    });
});

Routes.post("/uploadImg", (req, res) => {
    uPload(req, res, (msg) => {
        fs.readdir('./public/Images/KidsShoots', (err, data) => {
            res.render('UploadPhotography', {
                login: true,
                status: msg ? 0 : 1,
                mass: msg ? msg : "File Uploaded :)",
                PhotoType: "Upload To Kids Shoots",
                uploadRoutes: "/kidsshoots/",
                imgRoutes: `http://localhost:${port}/public/KidsShoots/`,
                imgData: data,
                Dipart: "KidsShoots Images"
            });
        });
    })

});

Routes.get("/deleteImg?:id", (req, res) => {
    fs.unlink(`./public/Images/KidsShoots/${req.query.id}`, (err) => {
        if (err) {
            fs.readdir('./public/Images/KidsShoots', (err, data) => {
                console.log(data);
                res.render('UploadPhotography', {
                    login: true,
                    status: 2,
                    mass: "Img Already Deleted :)",
                    PhotoType: "Upload To Kids Shoots",
                    uploadRoutes: "/kidsshoots/",
                    imgRoutes: `http://localhost:${port}/public/KidsShoots/`,
                    imgData: data,
                    Dipart: "KidsShoots Images"
                });
            });
        }
        else {
            fs.readdir('./public/Images/KidsShoots', (err, data) => {
                console.log(data);
                res.render('UploadPhotography', {
                    login: true,
                    status: 1,
                    mass: "Img Deleted :)",
                    PhotoType: "Upload To Kids Shoots",
                    uploadRoutes: "/kidsshoots/",
                    imgRoutes: `http://localhost:${port}/public/KidsShoots/`,
                    imgData: data,
                    Dipart: "KidsShoots Images"
                });
            });
        }
    });
});


Routes.get("/getdiscript", (req, res) => {
    fs.readFile('./data/KidsShootsData.txt', 'utf8', (err, data) => {
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
    fs.writeFile("./data/KidsShootsData.txt", discript, (err) => {
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