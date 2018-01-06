import { Router } from 'express';
import Database from './../controllers/databaseController';
import * as Mongo from 'mongodb';
export default () => {
    const router = Router();

    router.post('/', (req, res) => {
        let id = req.body.data._id;
        let path = req.body.data.imgPath;
        let name = req.body.name;
        Database.getPool((err, db) => {
            if (err) {
                console.log('error', err);
            } else {
                db.collection('imgData').update(
                    {
                        "_id": new Mongo.ObjectId(id),
                    },
                    {
                        "imgPath": path,
                        "name": name   
                    },
                     (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Updated Item');
                        res.sendStatus(200);
                    }
                })
            }
        })
    });
    return router;
}