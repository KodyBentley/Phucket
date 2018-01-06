// import * as mysql from 'mysql';
// import * as MongoClient from 'mongodb';
const MongoClient = require('mongodb').MongoClient;
// const dbConfig = require("./../../config/db.json");


export default class DatabaseController {

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

    public static getPool(cb:Function) {
        MongoClient.connect('mongodb://localhost:27017', (err, client) => {
            if(!err) {
                console.log('connected to database successfully');
                let db = client.db('phucket-db');
                cb(null, db)
            } else {
                console.log(err);
                cb(err, null);
                console.log('could not connect');
            }
        })
    }
}
