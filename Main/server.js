const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require ('uuid');



const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(express.static('db'));
const DB = path.join(__dirname, 'db', 'db.json');

let notes;

function loadDB(){
    notes = JSON.parse(fs.readFileSync(DB, 'utf-8'));
    return notes;
};



app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')))
app.get('/api/notes', (req, res) => {
    res.json(loadDB())
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
    notes.push(newNote);
    writeToDB(notes)
    res.json("Success");
})

function writeToDB(data) {
    notesString = JSON.stringify(data, null, 2)
    fs.writeFileSync(DB, notesString, 'utf-8');
    return;
}

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    const filteredNotes = loadDB().filter(note => note.id !== noteID);
    writeToDB(filteredNotes);
    loadDB();
    return;
})


app.listen(PORT, function(err) {
    if (err) console.log("Error")
    console.log(`Listening on port ${PORT}...`)
    loadDB()
});