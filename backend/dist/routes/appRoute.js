"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationController_1 = require("./../controllers/authenticationController");
const path = require('path');
exports.default = () => {
    let router = express_1.Router();
    router.get('/', authenticationController_1.default.loggedIn, (req, res) => {
        let decoded = authenticationController_1.default.tokenDecode(req.cookies.authorization);
        console.log('Fucking hello', decoded);
        let user = {
            email: decoded.sub
        };
        console.log('End of App Route');
        // res.render('index', user);
    });
    return router;
};
