import { Router } from 'express';
import * as fs from 'fs';
import Database from './../controllers/databaseController';
import Utils from './../utils/utils';
import { read } from 'fs';

export default () => {
    const router = Router();

    router.post('/', (req, res) => {
        let img = req.body.img;
        let imgName = req.body.name;
        let randomHash = Utils.randomHash();
        let base64Data = img.replace(/^data:image\/png;base64,/, "");
        let fsPath = "imgUploads/img-" + randomHash + ".png";
        let mongoPath = {
            imgPath: "imgUploads/img-" + randomHash + ".png",
            name: imgName
        }
        let route = '../frontend/public/';
        fs.writeFile(route + fsPath, base64Data, 'base64', () => {
            console.log('File written to static');
        });

        Database.getPool((err, db) => {
            if (err) {
                console.log(err);
            } else {
                db.collection('users').insert(mongoPath, (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('saved to database')
                    }
                })
            }
        })
        res.sendStatus(200);
    });
    return router;
}