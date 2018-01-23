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
    knex.insert(user)
        .into('users')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    // knex.select('*').from('users').where({ id })
    knex('users').where({ id })
        .then((foundUser) => {
            res.json(foundUser);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.get('/users', (req, res) => {
    knex('users')
        .then((foundUsers) => {
            res.json(foundUsers);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.get('/users/:id/posts', (req, res) => {
    const { id } = req.params;
    // knex.select('*').from('users').where({ id })
    knex.select('*').from('posts').where('userId', id)
        .then((foundPosts) => {
            res.json(foundPosts);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    knex('users').where({ id })
        .update(user)
        .then((foundUser) => {
            res.json(foundUser);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    knex('users').where({ id })
        .del()
        .then((deletedId) => {
            res.json(deletedId);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.listen(port, () => {
    console.log(`server is now running on port: ${port}`);
});