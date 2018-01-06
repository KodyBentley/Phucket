import Database from './databaseController';

export default class LoginController {
    public static createUser(data: Object, cb: Function): void {
        Database.getPool((err, db) => {
            if (err) {
                console.log('User Create Err ', err)
            } else {
                db.collection('users').insert(data, (err, results) => {
                    if(err) {
                        console.log('err in insert', err)
                        cb(false, results);
                    } else {
                        console.log('saved to database')
                        cb(true, results);
                    }
                });
            }
        });
    }
}