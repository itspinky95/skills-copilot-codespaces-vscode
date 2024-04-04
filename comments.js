// Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Read comments from file
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        res.json(comment);
    }
});

// Create new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        text: req.body.text
    };
    comments.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comment);
});

// Update comment by id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        comment.text = req.body.text;
        fs.writeFileSync('comments.json', JSON.stringify(comments));
        res.json(comment);
    }
});

// Delete comment by id
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('Comment not found');
    } else {
        const index = comments.indexOf(comment);
        comments.splice(index, 1);
        fs.writeFileSync('comments.json', JSON.stringify(comments));
        res.json(comment);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}
