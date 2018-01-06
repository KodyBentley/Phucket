import * as express from 'express';
import * as bodyParser from "body-parser";
import MainRoute from './routes/mainRoute';
import ImageUploadRoute from './routes/imageUploadRoute';
import Database from './controllers/databaseController';
var path = require('path');
var Server = (function () {
    function Server() {
        this._app = express();
        this.init();
    }
    Server.prototype.init = function () {
        this._app.listen(3001, function () {
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
        this._app.use('/', MainRoute());
        this._app.use('/img', ImageUploadRoute());
        Database.getPool();
    };
    return Server;
}());
export default Server;
new Server();
