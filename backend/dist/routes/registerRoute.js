"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_1 = require("./../controllers/validation");
const loginController_1 = require("./../controllers/loginController");
const authenticationController_1 = require("./../controllers/authenticationController");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let date = new Date();
        let password = req.body.password;
        // let data: { name: string, email: string, hash: string, date: Date } = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     hash: hash,
        //     date: date
        // };
        let encryptedPassword = authenticationController_1.default.encrypt(password, (err, hash) => {
            let data = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                date: date
            };
            if (err)
                res.sendStatus(500);
            let isValidEmail = validation_1.default.isValidEmail(data['email']);
            let isValidPassword = validation_1.default.isValidPassword(data['password']);
            if (isValidEmail && isValidPassword) {
            }
            else {
                return;
            }
            loginController_1.default.getUser(data['email'], (exists, user) => {
                if (exists) {
                    console.log('User already exists');
                    res.json({
                        message: 'User Already Exists'
                    });
                }
                else {
                    loginController_1.default.createUser(data, (created, results) => {
                        if (created) {
                            console.log('user created!');
                            res.json({ registrationSuccessful: true });
                        }
                        else {
                            console.log('user not created');
                        }
                    });
                }
            });
        });
    });
    return router;
};
