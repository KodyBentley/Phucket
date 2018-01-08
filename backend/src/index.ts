import * as express from 'express';
import * as bodyParser from "body-parser";
import ImageUploadRoute from './routes/imageUploadRoute';
import ImageDeleteRoute from './routes/imageDeleteRoute';
import ImageUpdateRoute from './routes/imageUpdateRoute';
import RegisterRoute from './routes/registerRoute';
import LoginRoute from './routes/loginRoute';
import Database from './controllers/databaseController';
const path = require('path');

export default class Server {
    private _app: express.Express = express();
    constructor() {
        this.init();
    }

    protected init() {
        this._app.listen(3001, () => {
            console.log('Listening on port 3001')
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

        this._app.use('/img', ImageUploadRoute());

        this._app.use('/delete', ImageDeleteRoute());

        this._app.use('/update', ImageUpdateRoute());

        this._app.use('/register', RegisterRoute());

        this._app.use('/login', LoginRoute());

        this._app.get('/api', (req, res) => {
            Database.getPool((err, db) => {
                db.collection('imgData').find().toArray((err, results) => {
                    res.json(results);
                })
            });
        });
    }
}
new Server();