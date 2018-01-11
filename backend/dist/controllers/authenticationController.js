"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tokenSecret = 'secret';
class Auth {
    static tokenVerify(token, cb) {
        console.log('TokenVerify');
        JWT.verify(token, 'secret', (err, decoded) => {
            if (err) {
                cb(false);
            }
            else {
                cb(true);
            }
        });
    }
    static loggedIn(req, res, next) {
        console.log('LoggedIn', req.headers);
        let token = req.cookies.authorization;
        console.log('token', token);
        JWT.verify(token, 'secret', (err, decoded) => {
            if (err) {
                // not logged in
                // res.redirect('/login');
                console.log("Fucked");
            }
            else {
                // user logged in
                next();
            }
        });
    }
    static tokenDecode(token) {
        return JWT.decode(token);
    }
    static encrypt(password, cb) {
        bcrypt.hash(password, 10, (err, hash) => {
            cb(err, hash);
        });
    }
    static compareHash(h1, h2, cb) {
        bcrypt.compare(h1, h2, (err, match) => {
            cb(err, match);
        });
    }
    static generateToken(email) {
        let data = {
            sub: email,
            iss: 'test-phucket.com'
        };
        return JWT.sign(data, tokenSecret);
    }
}
exports.default = Auth;
