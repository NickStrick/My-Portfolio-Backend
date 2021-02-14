
exports.up = function (knex) {
    return knex.schema.createTable('contactinfo', tbl => {
        tbl.increments();

        tbl.string('name', 255);
        tbl.string('phone', 255);
        tbl.string('email', 255).notNullable();
        tbl.text('message');
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('contactinfo');
};
