// import * as mysql from 'mysql';
import * as MongoClient from 'mongodb';
var dbConfig = require("./../../config/db.json");
var DatabaseController = (function () {
    function DatabaseController() {
    }
    //    public static getPool(cb:Function) {
    //         let pool = mysql.createPool(dbConfig);
    //         pool.getConnection((err, connection) => {
    //             if (err) {  
    //                 console.log("ERROR!")
    //                 cb(err, null);
    //             }
    //             if(!err) {
    //                 cb(null, connection);
    //             }
    //         })
    //     }
    DatabaseController.getPool = function () {
        MongoClient.connect('mongodb:localhost:27017/phucket-db', function (err, database) {
            if (!err) {
                console.log('Connected to Database');
            }
            else {
                console.log(err);
                console.log('error');
            }
        });
    };
    return DatabaseController;
}());
export default DatabaseController;
