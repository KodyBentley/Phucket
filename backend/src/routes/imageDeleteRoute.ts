import { Router } from 'express';
import Database from './../controllers/databaseController';
import * as Mongo from 'mongodb';
import * as fs from 'fs';
export default () => {
    const router = Router();

    router.post('/', (req, res) => {
        let id = req.body.data._id;
        let path = req.body.data.imgPath;
        let route = '../frontend/public/';
        fs.unlink(route + path, (err) => {
            if(err) {
                console.log('fs delete error', err)
            } else {
                console.log('Successfully removed with FS');
            }
        })
        Database.getPool((err, db) => {
            if (err) {
                console.log(err);
            } else {
                db.collection('imgData').remove({"_id": new Mongo.ObjectId(id)}, (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('deleted from database')
                        res.sendStatus(200);
                    }
                })
            }
        })
    });
    return router;
}