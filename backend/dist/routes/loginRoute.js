"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("./../controllers/loginController");
exports.default = () => {
    const router = express_1.Router();
    router.post('/', (req, res) => {
        let data = req.body;
        let email = data.email;
        let password = data.password;
        loginController_1.default.getUser(email, (exists, results) => {
            if (exists) {
                console.log(email, "found!");
                res.sendStatus(200);
            }
            else {
                console.log(email, 'no user found');
                res.json({
                    status: false,
                    message: "No user detected"
                });
            }
        });
    });
    return router;
};
