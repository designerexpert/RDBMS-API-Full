const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db.js');
const port = 3000;

const server = express();

server.use(bodyParser.json());

server.get('/api', (req, res) => {
    res.json({ sucess: 'Stuff Works!' });
});

server.post('/users', (req, res) => {
    const user = req.body;
    console.log(user)
    knex.insert(user)
        .into('users')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
});

server.listen(port, () => {
    console.log(`server is now running on port: ${port}`);
});