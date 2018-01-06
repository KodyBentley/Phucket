"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const dbConfig = require("./../../config/db.json");
class DatabaseController {
    static getPool(cb) {
        let pool = mysql.createPool(dbConfig);
        pool.getConnection((err, connection) => {
            if (err) {
                console.log("ERROR!");
                cb(err, null);
            }
            if (!err) {
                cb(null, connection);
            }
        });
    }
}
exports.default = DatabaseController;
