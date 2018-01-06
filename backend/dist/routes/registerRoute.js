"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseController_1 = require("./../controllers/databaseController");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let date = new Date();
        let data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            date: date
        };
        databaseController_1.default.getPool((err, db) => {
            if (err) {
                console.log(err);
            }
            else {
                db.collection('users').insert(data, (err, result) => {
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
