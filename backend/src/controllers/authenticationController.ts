import * as JWT from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
const tokenSecret:string = 'secret';

export default class Auth { 

    public static tokenVerify(token:string, cb:Function) {
        console.log('TokenVerify')
        console.log('TOKEN', token)
        JWT.verify(token, 'secret', (err, decoded) => {
            if(err) {
                cb(false)
            } else {
                cb(true, decoded);
            }
        });
    }

    public static loggedIn(req, res, next) {
        console.log('LoggedIn', req.headers)
        let token = req.cookies.authorization;
        console.log('token', token)
        JWT.verify(token, 'secret', (err, decoded) => {
            if(err) {
                // not logged in
                // res.redirect('/login');
                console.log("Fucked");
            } else {
                // user logged in
                next();
            }
        });
    }

    public static tokenDecode(token:string) {
        return JWT.decode(token);
    }


    public static encrypt(password:string, cb:Function) {
        
        bcrypt.hash(password, 10, (err, hash) => {
            cb(err, hash);
          });
    }

    public static compareHash(h1:string, h2:string, cb:Function) {
        
        bcrypt.compare(h1, h2, (err, match) => {
            cb(err, match);
        });
    }

    public static generateToken(email: string) {
        let data = {
            sub: email,
            iss: 'test-phucket.com'
        }
        return JWT.sign(data, tokenSecret);
    }
}