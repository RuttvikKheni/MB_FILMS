const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Routes = express.Router();

storage = multer.diskStorage({
    destination: './public/Images/Profile/Admin',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_adminImg_" + Date.now() + path.extname(file.originalname));
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


Routes.get('/', (req, res) => {

    fs.readdir('./public/Images/Profile/Admin', (err, img) => {
        if (err) throw err;
        res.render('Admin', {
            adminImg: img[0],
        });
    });

});


Routes.post('/', (req, res) => {
    uploAd(req, res, (err) => {
        if (err) {
            console.log(err);
            obj = {};
            obj['status'] = 0;
            obj['error'] = err;
            res.send(obj);
        } else {
            fs.unlink(`./public/Images/Profile/Admin/${req.body.oldImg}`, (err) => {
                if (err) {
                    fs.unlink(`./public/Images/Profile/Admin/${req.file.filename}`, (error) => {
                        if (error) {
                            obj = {};
                            obj['status'] = 0;
                            obj['error'] = "Image Not Found";
                            res.send(obj);
                        } else {
                            obj = {};
                            obj['status'] = 0;
                            obj['error'] = "Image Not Found";
                            res.send(obj);
                        }
                    });
                } else {
                    obj = {};
                    obj['status'] = 1;
                    obj['msg'] = "Image Changed :) ";
                    obj['imgName'] = req.file.filename;
                    res.send(obj);
                }
            });
        }
    });
});

module.exports = Routes;