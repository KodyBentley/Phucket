import { Router } from 'express';
import Database from './../controllers/databaseController';

export default () => {
    const router = Router();

    router.post('/', (req, res) => {
        let date = new Date();
        let data: Object = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            date: date
        };
        Database.getPool((err, db) => {
            if (err) {
                console.log(err);
            } else {
                db.collection('users').insert(data, (err, result) => {
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