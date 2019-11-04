require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const {SESSION_SECRET, SERVER_PORT } = process.env;
const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));
app.use(checkForSession)

app.get('/api/swag', swagController.read)

app.listen(SERVER_PORT, () => console.log(`I would like ${SERVER_PORT} weed please.`));