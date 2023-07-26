// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Create comments array
let comments = [];

// Read comments data from file
fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        comments = JSON.parse(data);
    }
});

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = comments.find(comment => comment.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.json({});
    }
});

// Insert a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const comment = req.body;
    const index = comments.findIndex(comment => comment.id === id);
    if (index >= 0) {
        comments[index] = comment;
    }
    res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    comments = comments.filter(comment => comment.id !== id);
    res.json({
        deleted: true
    });
});