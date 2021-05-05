const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('express');



const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(express.static('db'));

const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8'));


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')))
app.get('/api/notes', (req, res) => {
    console.log(notes)
    res.json(notes)
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    const id = '192894738';
    newNote.id = id;
    console.log(newNote);
    notes.push(newNote);
    console.log(notes)
    res.json("Success");
})

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    console.log(testArray);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))