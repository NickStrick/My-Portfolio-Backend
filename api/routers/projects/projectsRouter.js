const express = require('express');
const router = express.Router();


module.exports = router;

const db = require('../../data/helpers/schoolModel.js');

router.route('/')
    .get(get)
    // .post(add)
    ;

// router.route('/:id')
//     .get(getId)
//     .delete(remove)
//     .put(update)
//     ;


// Functions
function get(req, res) {
    db.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ msg: 'cant find table', err }));
}