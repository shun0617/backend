var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
const bcrypt = require('bcrypt');
var MongoClient = mongodb.MongoClient;
var url_mongo = "mongodb://heroku_m6pw58z7:3m2jnsghpanegrhnu540iusr7g@ds155651.mlab.com:55651/heroku_m6pw58z7";
var db = 'heroku_m6pw58z7';

router.post('/', function(req, res) {
    MongoClient.connect(url_mongo, {
        useNewUrlParser: true
    }, function(err, client) {
        if(err) throw err;
        let body = req.body;
        let hashed_password = bcrypt.hashSync(body.password, 10);
        let data = {
            name: body.name,
            email: body.email,
            password: hashed_password,
            profile: body.profile,
        }
        client.db(db).collection("users").insertOne(data,function(err, r) {
            if(err) throw err;
            client.close();
            res.send(r);
        });
    });
});
module.exports = router;