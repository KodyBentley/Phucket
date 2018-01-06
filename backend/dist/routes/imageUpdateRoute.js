"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseController_1 = require("./../controllers/databaseController");
const Mongo = require("mongodb");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let id = req.body.data._id;
        let path = req.body.data.imgPath;
        let name = req.body.name;
        databaseController_1.default.getPool((err, db) => {
            if (err) {
                console.log('error', err);
            }
            else {
                db.collection('imgData').update({
                    "_id": new Mongo.ObjectId(id),
                }, {
                    "imgPath": path,
                    "name": name
                }, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Updated Item');
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
    return router;
};
