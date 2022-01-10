"use strict";
const express = require('express');
const path = require('path');
const serverRoute = require('./src/routes/route')
const bodyParser = require('body-parser');
const cookie = require('cookie-parser')
const session = require('express-session')

const PORT = process.env.PORT || 8080;
const app = express();


app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))

app.use(cookie())

app.use(express.static(path.join(__dirname + '')));


app.use(session({
    secret: 'key',
    key: 'id',
    saveUninitialized: true,
    cookie: {
        maxAge: 1209600,
        httpOnly: true
    }
}))





app.use(serverRoute);




app.listen(PORT, () => {
    console.log('server started')
});



