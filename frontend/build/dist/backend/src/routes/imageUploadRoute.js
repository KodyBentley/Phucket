import { Router } from 'express';
import * as fs from 'fs';
import Utils from './../utils/utils';
export default function () {
    var router = Router();
    router.post('/', function (req, res) {
        var img = req.body.img;
        var randomHash = Utils.randomHash();
        var base64Data = img.replace(/^data:image\/png;base64,/, "");
        var path = "imgUploads/img-" + randomHash + ".png";
        var route = './../../public/';
        fs.writeFile(route + path, base64Data, 'base64', function () {
            console.log('File written to static');
        });
        // Database.getPool( (err, con) => {
        //     con.query("INSERT INTO users(path) values(?)", [path], (err, result) => {
        //         if(err) {
        //             console.log(err);
        //             // cb(false, result)
        //         } else {
        //             console.log('record inserted')
        //             // cb(true, result);
        //         }
        //     });
        // });
        res.json({
            upload: 'okay'
        });
    });
    return router;
};
