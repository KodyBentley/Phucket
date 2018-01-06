"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const databaseController_1 = require("./../controllers/databaseController");
const utils_1 = require("./../utils/utils");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let img = req.body.img;
        let imgName = req.body.name;
        let randomHash = utils_1.default.randomHash();
        let base64Data = img.replace(/^data:image\/png;base64,/, "");
        let fsPath = "imgUploads/img-" + randomHash + ".png";
        let mongoPath = {
            imgPath: "imgUploads/img-" + randomHash + ".png",
            name: imgName
        };
        let route = '../frontend/public/';
        fs.writeFile(route + fsPath, base64Data, 'base64', () => {
            console.log('File written to static');
        });
        databaseController_1.default.getPool((err, db) => {
            if (err) {
                console.log(err);
            }
            else {
                db.collection('imgData').insert(mongoPath, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('saved to database');
                    }
                });
            }
        });
        res.sendStatus(200);
    });
    return router;
};
