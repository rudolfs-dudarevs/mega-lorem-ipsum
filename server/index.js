const dotenv = require('dotenv');
const express = require('express');
const db = require('mongodb');
const mongoose = require('mongoose');

const constants = require('./configuration/constants.js')
const userData = require('./routes/userData.js');
const home = require('./routes/home.js');

const app = express();

app.use(express.static('../client'));
app.use('/mega-lorem-ipsum', express.json(), userData);
app.use('*', home);

mongoose.Promise = global.Promise;
mongoose.connect(constants.mongo.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    console.log('DB_ERROR:', error)
});


app.listen(3000, () => console.log('Mega Lorem Ipsum is listening.'));
``