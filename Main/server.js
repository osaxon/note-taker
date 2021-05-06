const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require ('uuid');



const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(express.static('db'));

const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')))
app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newID = uuidv4();
    const newNote = {
        title: newTitle,
        text: newText,
        id: newID
    }
    console.log(newNote);
    notes.push(newNote);
    res.json("Success");
})

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))