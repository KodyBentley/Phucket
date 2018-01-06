import { Router } from 'express';
import Database from './../controllers/databaseController';
import Validation from './../controllers/validation';
import LoginController from './../controllers/loginController';

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
        let isValidEmail = Validation.isValidEmail(data['email']);
        let isValidPassword = Validation.isValidPassword(data['password']);
        if(isValidEmail && isValidPassword) {

        } else {
            return;
        }
        LoginController.createUser(data, (created, results) => {
            if(created) {
                console.log('user created!')
                res.redirect('/');
            } else {
                console.log('user not created');
            }
        })
    });
    return router;
}