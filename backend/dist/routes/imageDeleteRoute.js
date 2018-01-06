"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseController_1 = require("./../controllers/databaseController");
const Mongo = require("mongodb");
const fs = require("fs");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let id = req.body.data._id;
        let path = req.body.data.imgPath;
        let route = '../frontend/public/';
        fs.unlink(route + path, (err) => {
            if (err) {
                console.log('fs delete error', err);
            }
            else {
                console.log('Successfully removed with FS');
            }
        });
        databaseController_1.default.getPool((err, db) => {
            if (err) {
                console.log(err);
            }
            else {
                db.collection('users').remove({ "_id": new Mongo.ObjectId(id) }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('deleted from database');
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
    return router;
};
