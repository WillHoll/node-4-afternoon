const swag = require('../models/swag');

module.exports = {
    search: (req, res) => {
        const {category} = req.query;
        if (category) {
            const filteredSwag = swag.filter(el => el.category === category);
            res.status(200).send(filteredSwag);
        } else {
            res.status(200).send(swag)
        }
    }
}