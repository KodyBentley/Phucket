import * as express from 'express';
var Server = (function () {
    function Server() {
        this._app = express();
        this.init();
    }
    Server.prototype.init = function () {
        this._app.listen(3001, function () {
            console.log('Listening on port 3001');
        });
        this._app.get('/', function (req, res, next) {
            res.send('Hello ASSHOLES');
        });
    };
    return Server;
}());
export default Server;
