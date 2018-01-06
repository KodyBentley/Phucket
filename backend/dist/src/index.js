"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mainRoute_1 = require("./routes/mainRoute");
const imageUploadRoute_1 = require("./routes/imageUploadRoute");
const path = require('path');
class Server {
    constructor() {
        this._app = express();
        this.init();
    }
    init() {
        this._app.listen(3001, () => {
            console.log('Listening on port 3001');
        });
        this._app.use(express.static('dist'));
        this._app.use(bodyParser.json({ limit: '50mb' }));
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
        this._app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this._app.use('/', mainRoute_1.default());
        this._app.use('/img', imageUploadRoute_1.default());
    }
}
exports.default = Server;
new Server();
