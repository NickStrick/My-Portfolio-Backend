const express = require('express');
const router = express.Router();


module.exports = router;

const db = require('./contactModel.js');

router.route('/')
    .get(get)
    .post(add)
    ;

// Functions
function get(req, res) {
    db.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ msg: 'cant find contact table', err }));
}

function add(req, res) {
    const { phone, email, message, firstName, lastName } = req.body;
    const info = {
        name: firstName + ' ' + lastName,
        phone,
        email,
        message
    };
    console.log(info)
    db.add(info)
        .then(result => {
            res.status(200).json(1);
        })
        .catch(err => res.status(500).json({ msg: 'cant add to contact table', err }));
}