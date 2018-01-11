import { Router } from 'express';
import Database from './../controllers/databaseController';
import Validation from './../controllers/validation';
import LoginController from './../controllers/loginController';
import Auth from './../controllers/authenticationController';

export default () => {
    const router = Router();

    router.post('/', (req, res) => {
        let date: Date = new Date();
        let password = req.body.password;
        // let data: { name: string, email: string, hash: string, date: Date } = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     hash: hash,
        //     date: date
        // };
        let encryptedPassword = Auth.encrypt(password, (err, hash) => {
            let data: { name: string, email: string, password: string, date: Date } = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                date: date
            };
            if (err) res.sendStatus(500);
            let isValidEmail = Validation.isValidEmail(data['email']);
            let isValidPassword = Validation.isValidPassword(data['password']);
            if (isValidEmail && isValidPassword) {

            } else {
                return;
            }
            LoginController.getUser(data['email'], (exists, user) => {
                if (exists) {
                    console.log('User already exists')
                    res.json( {
                        message: 'User Already Exists'
                    });
                } else {
                    LoginController.createUser(data, (created, results) => {
                        if (created) {
                            console.log('user created!')
                            res.json({registrationSuccessful: true});
                        } else {
                            console.log('user not created');
                        }
                    })
                }
            })
        });
    });
    return router;
}