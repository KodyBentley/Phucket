"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseController_1 = require("./databaseController");
class LoginController {
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
