
exports.up = function (knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments();

        tbl.string('name', 255).notNullable().unique();
        tbl.string('description', 128).notNullable();
        tbl.string('img');
        tbl.string('link').notNullable();
        tbl.string('deployed');
        tbl.string('role');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('projects');
};
