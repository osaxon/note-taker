const express = require('express');
const path = require('path');



const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.static('public'))

const testArray = [
    {
        title:"Test Title",
        text:"Test text",
        id: 123456,
    }
]


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public', 'notes.html')))

app.get('/api/notes', (req, res) => res.json(testArray))

app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id;
    console.log(noteID)
    res.end("Success");
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))