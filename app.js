'use strict';

let path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    methods = require('methods');
// http = require('http'),
// session = require('express-session'),
// cors = require('cors'),
// passport = require('passport'),
// errorhandler = require('errorhandler'),
// mongoose = require('mongoose')

let isProduction = process.env.NODE_ENV === 'production';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password', // mysqlの自分のパスワード
    database: 'express' // db名は自分で自由に作った名前を当てはめる
});
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
        console.error(err);
    }
    else {
        console.log('Connection established');
    }
})

// Create global app object
const app = express();

// use static files
app.use(express.static(path.join(__dirname + 'static')));
// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Routing here!
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});
// app.get('/', (req, res) => {
//     res.send('GET request to the homepage');
// });
app.post('/question', (req, res) => {
    connection.query(
        'insert into questions (content) values (?);',
        [req.body.content],
        (err) => {
            if (err) {
                console.log('SQL execution failed.');
            }
            res.redirect('/');
        }
    )
});
// app.post('/question', (req, res) => {
//     console.log(req.body.content);
//     res.redirect('/');
// });

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port);
});
