const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.status(200).send([
        {
            name: 'Andrew Mead',
            age: 26
        }, {
            name: 'Nuwan Goonewardena',
            age: 25
        },{
            name: 'Alex Gordon',
            age: 23
        }
    ])
})

app.listen(3000);
module.exports.app = app;