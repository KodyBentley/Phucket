"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs = require("fs");
const databaseController_1 = require("./../controllers/databaseController");
const utils_1 = require("./../../utils/utils");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let img = req.body.img;
        let base64Data = img.replace(/^data:image\/png;base64,/, "");
        let path = "imgUploads/img.png";
        let route = './../../public/';
        let randomHash = utils_1.default.randomHash();
        console.log('Random Hash', randomHash);
        fs.writeFile(route + path, base64Data, 'base64', () => {
            // console.log('File written to static');
            console.log('the fuck');
        });
        databaseController_1.default.getPool((err, con) => {
            con.query("INSERT INTO users(path) values(?)", [path], (err, result) => {
                if (err) {
                    console.log(err);
                    // cb(false, result)
                }
                else {
                    console.log('record inserted');
                    // cb(true, result);
                }
            });
        });
        res.json({
            upload: 'okay'
        });
    });
    return router;
};
