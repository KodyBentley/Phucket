import { Router } from 'express';
import Database from './../controllers/databaseController';
import Validation from './../controllers/validation';
import LoginController from './../controllers/loginController';

export default () => {
    const router = Router();

    router.post('/', (req, res) => {
        let data: {email: string, password: string} = req.body;
        let email: string = data.email;
        let password: string = data.password;

        LoginController.getUser(email, (exists, results) => {
            if(exists) {
                console.log(email, "found!")
                res.sendStatus(200);
            } else {
                console.log(email, 'no user found')
                res.json({
                    status: false,
                    message: "No user detected"
                });
            }
        })
    });
    return router;
}