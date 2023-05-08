// load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}

// import dependencies
const express = require('express');
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesController = require('./controllers/notesController');



// create an express app
const app = express();

// configure express app
app.use(express.json());
app.use(cors());

//connect to db
connectToDb();

// routing
app.get('/notes', notesController.fetchNotes);

app.get('/notes/:id', notesController.fetchNote);

app.post('/notes', notesController.createNote);

app.put('/notes/:id', notesController.updateNote);

app.delete('/notes/:id', notesController.deleteNote);

//start our server
app.listen(process.env.PORT);