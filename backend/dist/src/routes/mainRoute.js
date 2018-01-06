"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const databaseController_1 = require("./../controllers/databaseController");
exports.default = () => {
    const router = express_1.Router();
    router.get('/api', (req, res) => {
        databaseController_1.default.getPool((err, con) => {
            con.query("SELECT * FROM users", (err, result) => {
                if (err) {
                    console.log(err);
                    // cb(false, null);
                }
                else {
                    if (result.length > 0) {
                        // cb(true, result); 
                        console.log(result);
                        res.json(result);
                    }
                    else {
                        // cb(false, result);
                    }
                }
            });
        });
    });
    return router;
};
