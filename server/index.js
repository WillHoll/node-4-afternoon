require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');
const {SESSION_SECRET, SERVER_PORT } = process.env;
const app = express();

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}));
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));
// auth endpoints
app.get('/api/user', authController.getUser)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
//swag endpoints
app.get('/api/swag', swagController.read)
//cart endpoints
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)
//search endpoint
app.get('/api/search', searchController.search)

app.listen(SERVER_PORT, () => console.log(`I would like ${SERVER_PORT} weed please.`));