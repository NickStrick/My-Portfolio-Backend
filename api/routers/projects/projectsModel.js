const db = require('../../../data/dbConfig.js');

module.exports = {
    get,
    add,
    remove,
    update,
}


function get(id) {
    let query = db('projects');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}


function add(project) {
    console.log(project)
    return db('projects')
        .insert(project)
        .then(([id]) => ({ id }));
}

function remove(id) {
    return db('projects')
        .where('id', id)
        .del();
}

function update(id, changes) {
    return db('projects')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.get(id) : null));
}