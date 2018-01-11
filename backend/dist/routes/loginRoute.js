"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./../controllers/loginController");
const authenticationController_1 = require("./../controllers/authenticationController");
const cookieExpire = Math.floor(1000 * 60 * 60 * 24 * 7); // 7 days
exports.default = () => {
    const router = express_1.Router();
    router.get('/', (req, res) => {
        let token = req.cookies.authorization;
        console.log(token);
        authenticationController_1.default.tokenVerify(token, (loggedIn) => {
            if (!loggedIn) {
                console.log('YOU ARE NOT LOGGED IN');
            }
            else {
                console.log('You ARE LOGGED IN');
            }
        });
    });
    router.post('/', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;
        loginController_1.default.getUser(email, (exists, result) => {
            if (exists) {
                if (result.length > 0) {
                    authenticationController_1.default.compareHash(password, result[0].password, (err, match) => {
                        if (err)
                            res.sendStatus(500);
                        if (match) {
                            let token = authenticationController_1.default.generateToken(email);
                            res.cookie('authorization', token, { maxAge: cookieExpire, httpOnly: true });
                            res.json({
                                loggedIn: true,
                                user: email,
                                token: token
                            });
                        }
                        else {
                            console.log('no account detected');
                            res.json({
                                status: false,
                                message: "No account detected1",
                                loggedIn: false
                            });
                        }
                    });
                }
                else {
                    res.json({
                        status: false,
                        message: "No account detected2"
                    });
                }
            }
            else {
                res.json({
                    status: false,
                    message: 'No account detected'
                });
            }
        });
    });
    return router;
};
