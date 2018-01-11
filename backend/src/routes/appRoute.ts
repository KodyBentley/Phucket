import { Router } from 'express';
import * as Express from 'express';
import Auth from './../controllers/authenticationController'

const path = require('path');

export default () => {
    let router = Router();    

    router.get('/', Auth.loggedIn, (req, res) => {
        let decoded:any = Auth.tokenDecode(req.cookies.authorization);
        console.log('Fucking hello',decoded);
        let user = {
            email: decoded.sub
        }
        console.log('End of App Route');
        // res.render('index', user);
    })


    return router;
}