"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("./../controllers/validation");
const loginController_1 = require("./../controllers/loginController");
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
        let isValidEmail = validation_1.default.isValidEmail(data['email']);
        let isValidPassword = validation_1.default.isValidPassword(data['password']);
        if (isValidEmail && isValidPassword) {
        }
        else {
            return;
        }
        loginController_1.default.createUser(data, (created, results) => {
            if (created) {
                console.log('user created!');
                res.redirect('/');
            }
            else {
                console.log('user not created');
            }
        });
    });
    return router;
};
