const db = require('../../../data/dbConfig.js');

module.exports = {
    get,
    add
}

function get(id) {
    let query = db('contactinfo');

    if (id) {
        return query
            .where('id', id)
            .first()
    }

    return query;
}


function add(contact) {
    return db('contactinfo')
        .insert(contact)
}
