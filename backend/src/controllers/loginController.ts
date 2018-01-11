import Database from './databaseController';

export default class LoginController {

    public static getUser(email: string, cb: Function): void {
        Database.getPool((err, db) => {
            if (err) {
                console.log('User Create Err ', err)
            } else {
                db.collection('users').find({"email": email }).toArray((err, results) => {
                    if (err) {
                        console.log('err in get user find', err)
                        cb(false, null);
                    } else {
                        if(results.length > 0) {
                            console.log('User exists. Logging in.')
                            cb(true, results)
                        } else {
                            console.log("User does not exist")
                            cb(false, results);
                        }
                    }
                })
            }
        });
    }

    public static createUser(data: {name: string, email: string, password: string}, cb: Function): void {
        Database.getPool((err, db) => {
            if (err) {
                console.log('User Create Err ', err)
            } else {
                db.collection('users').insert(data, (err, results) => {
                    if (err) {
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