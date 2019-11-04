const users = require('../models/users');
let id = 1;

module.exports = {
    login: (req, res) => {
        const {username, password} = req.body
        if (users.find(user => user.username === username && user.password === password)) {
            req.session.user.username = username
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send({errorMessage: 'user not found'})
        }
    },
    register: (req, res) => {
        const {username, password} = req.body;
        users.push({id, username, password});
        id++
        req.session.user.username = username;
        res.status(200).send(req.session.user)
    },
    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session)
    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }
}
