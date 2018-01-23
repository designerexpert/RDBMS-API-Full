const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db.js');
const port = 3000;

const server = express();

server.use(bodyParser.json());

server.get('/api', (req, res) => {
    res.json({ sucess: 'Stuff Works!' });
});

// #################### USERS ENDPOINTS #################
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
// #################### END USERS ENDPOINTS #################
// #################### POSTS ENDPOINTS #################

server.post('/posts', (req, res) => {
    const post = req.body;
    knex.insert(post)
        .into('posts')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
});

server.get('/posts', (req, res) => {
    knex('posts')
        .then(foundPosts => {
            res.json(foundPosts);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    // knex.select('*').from('users').where({ id })
    knex('posts').where({ id })
        .then(foundPost => {
            res.json(foundPost);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
    knex('posts').where({ id })
        .update(post)
        .then((foundPost) => {
            res.json(foundPost);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    knex('posts').where({ id })
        .del()
        .then((deletedId) => {
            res.json(deletedId);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});
// #################### END POSTS ENDPOINTS #################
// #################### BEGIN TAGS ENDPOINTS #################
server.post('/tags', (req, res) => {
    const tag = req.body;
    knex.insert(tag)
        .into('tags')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        });
});

server.get('/tags', (req, res) => {
    knex('tags')
        .then(found => {
            res.json(found);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    // knex.select('*').from('users').where({ id })
    knex('tags').where({ id })
        .then(found => {
            res.json(found);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.put('/tags/:id', (req, res) => {
    const { id } = req.params;
    const tag = req.body;
    knex('tags').where({ id })
        .update(tag)
        .then((found) => {
            res.json(found);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});

server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    knex('tags').where({ id })
        .del()
        .then((deleted) => {
            res.json(deleted);
        })
        .catch(err => {
            res.json({ errorMessage: err.message });
        })
});


server.listen(port, () => {
    console.log(`server is now running on port: ${port}`);
});