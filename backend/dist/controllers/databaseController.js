"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
class DatabaseController {
    static getPool(cb) {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if (!err) {
                console.log('connected to database successfully');
                let db = client.db('phucket-db');
                cb(null, db);
            }
            else {
                console.log(err);
                cb(err, null);
                console.log('could not connect');
            }
        });
    }
}
exports.default = DatabaseController;
