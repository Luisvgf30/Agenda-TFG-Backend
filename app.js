const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const eventsRouter = require('./routes/events');
const notesRouter = require('./routes/notes');


app.use("/", usersRouter);
app.use("/", tasksRouter);
// app.use("/", eventsRouter);
app.use("/", notesRouter);

app.get("/health", (req, res) => {
    res.send({data: "healthy"})
});


module.exports = app;