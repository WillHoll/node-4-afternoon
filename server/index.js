require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const {SESSION_SECRET, SERVER_PORT } = process.env;
const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));
app.use(checkForSession)
// auth endpoints
app.get('/api/user', authController.getUser)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
//swag endpoints
app.get('/api/swag', swagController.read)

app.listen(SERVER_PORT, () => console.log(`I would like ${SERVER_PORT} weed please.`));