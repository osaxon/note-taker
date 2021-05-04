const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Main', 'public', 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'Main', 'public', 'notes.html')))

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))