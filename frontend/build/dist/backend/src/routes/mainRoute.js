import { Router } from 'express';
export default function () {
    var router = Router();
    router.get('/api', function (req, res) {
        // Database.getPool((err, con) => {
        //     con.query("SELECT * FROM users", (err, result) => {
        //         if(err) {
        //             console.log(err);
        //             // cb(false, null);
        //         } else {
        //             if(result.length > 0) {
        //                 // cb(true, result); 
        //                 res.json(result);
        //             }else {
        //                 // cb(false, result);
        //             }               
        //         }
        //     });
        //   });
    });
    return router;
};
