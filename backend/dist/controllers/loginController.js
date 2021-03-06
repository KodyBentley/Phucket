"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseController_1 = require("./databaseController");
class LoginController {
    static getUser(email, cb) {
        databaseController_1.default.getPool((err, db) => {
            if (err) {
                console.log('User Create Err ', err);
            }
            else {
                db.collection('users').find({ "email": email }).toArray((err, results) => {
                    if (err) {
                        console.log('err in get user find', err);
                        cb(false, null);
                    }
                    else {
                        if (results.length > 0) {
                            console.log('User exists. Logging in.');
                            cb(true, results);
                        }
                        else {
                            console.log("User does not exist");
                            cb(false, results);
                        }
                    }
                });
            }
        });
    }
    static createUser(data, cb) {
        databaseController_1.default.getPool((err, db) => {
            if (err) {
                console.log('User Create Err ', err);
            }
            else {
                db.collection('users').insert(data, (err, results) => {
                    if (err) {
                        console.log('err in insert', err);
                        cb(false, results);
                    }
                    else {
                        console.log('saved to database');
                        cb(true, results);
                    }
                });
            }
        });
    }
}
exports.default = LoginController;
