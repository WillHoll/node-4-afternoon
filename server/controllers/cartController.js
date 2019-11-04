const swag = require('../models/swag');

module.exports = {
    add: (req, res) => {
        const { user } = req.session;
        const { id } = req.params;
        if (user.cart.find(swag => swag.id === Number(id))) {
            res.status(200).send(user)
        } else {
            const product = swag.find(item => item.id === Number(id))
            user.cart.push(product)
            user.total += product.price;
            res.status(200).send(user)
        }
    },
    delete: (req, res) => {
        const { user } = req.session;
        const { id } = req.params;
        const removedObj = user.cart.find(el => el.id === Number(id));
        const index = user.cart.findIndex(el => el.id === Number(id));
        if (index !== -1) {
            user.total -= removedObj.price;
            user.cart.splice(index, 1);
        }
        res.status(200).send(user)
    },
    checkout: (req, res) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).send(user)
    }
}