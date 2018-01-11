import { Router } from 'express';
import Database from './../controllers/databaseController';
import Validation from './../controllers/validation';
import LoginController from './../controllers/loginController';
import Auth from './../controllers/authenticationController';
const cookieExpire: number = Math.floor(1000 * 60 * 60 * 24 * 7); // 7 days


export default () => {
    const router = Router();

    router.get('/', (req, res) => {
        let token = req.cookies.authorization;
        console.log(token);
        Auth.tokenVerify(token, (loggedIn) => {
            if (!loggedIn) {
                console.log('YOU ARE NOT LOGGED IN')
            } else {
                console.log('You ARE LOGGED IN')
            }
        });
    });

    router.post('/', (req, res) => {
        let data: { email: string, password: string } = req.body;
        let email: string = data.email;
        let password: string = data.password;

        LoginController.getUser(email, (exists, result) => {
            if (exists) {
                if (result.length > 0) {
                    Auth.compareHash(password, result[0].password, (err, match) => {
                        if (err) res.sendStatus(500);

                        if (match) {
                            let token = Auth.generateToken(email);
                            res.cookie('authorization', token, { maxAge: cookieExpire, httpOnly: true });
                            res.json({
                                loggedIn: true,
                                user: email,
                                token: token
                            });
                        } else {
                            console.log('no account detected');
                            res.json({
                                status: false,
                                message: "No account detected1",
                                loggedIn: false
                            });
                        }
                    });

                } else {
                    res.json({
                        status: false,
                        message: "No account detected2"
                    });
                }
            } else {
                res.json({
                    status: false,
                    message: 'No account detected'
                })
            }
        });
    });
    return router;
}