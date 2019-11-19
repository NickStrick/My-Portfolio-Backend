const express = require('express');
const router = express.Router();


module.exports = router;

const db = require('./projectsModel.js');

router.route('/')
    .get(get)
    .post(add)
    ;

router.route('/:id')
    .get(getId)
    .delete(remove)
    .put(update)
    ;


// Functions
function get(req, res) {
    db.get()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => res.status(500).json({ msg: 'cant find table', err }));
}

function getId(req, res) {
    const id = req.params.id;

    db.get()
        .then(projects => {
            let found = false;
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                db.get(id)
                    .then(project => res.status(200).json(project))
                    .catch(err => res.status(500).json({ err, msg: 'required fields: name, description, link. Name must be unique' }))
            } else {
                res.status(404).json({ msg: 'project with id not found' });
            }
        })
        .catch(err => {
            res.status(400).json({ err, msg: "failed to get projects array" })
        })
}

function add(req, res) {
    const info = req.body;
    if (info.name && info.description && info.link) {
        db.add(req.body)
            .then(result => {
                db.get(result.id)
                    .then(project => {
                        res.status(201).json(project);
                    })
                    .catch(err => res.status(401).json({ err, msg: 'cannot find project' }));
            }).catch(err => res.status(405).json({ msg: 'name must be unique', err }));
    } else {
        res.status(422).json('Must include name, description, and link');
    }
}

function remove(req, res) {
    const id = req.params.id;

    db.get()
        .then(schools => {
            let found = false;
            for (let i = 0; i < schools.length; i++) {
                if (schools[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                db.remove(id)
                    .then(result => {
                        res.status(200).json({ deleted: (!!result) });
                    })
                    .catch(err => res.status(400).json({ msg: 'id not found', err }))
            } else {
                res.status(404).json({ msg: 'project with id not found' });
            }
        })
        .catch(err => {
            res.status(400).json({ err, msg: "failed to get projects array" })
        })


}

function update(req, res) {
    const { id } = req.params;
    const changes = req.body;

    db.get()
        .then(projects => {
            let found = false;
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                if (changes) {
                    db.update(id, changes)
                        .then(result => {
                            res.status(203).json(result);
                        })
                        .catch(err => res.status(500).json({ msg: 'could not update', err }))
                } else {
                    res.status(500).json({ msg: "you must give a changed project object(req.body)" })
                }
            } else {
                res.status(404).json({ msg: 'project with id not found' });
            }
        })
        .catch(err => {
            res.status(400).json({ err, msg: "failed to get projects array" })
        })



}