
exports.up = function (knex) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments();

        tbl.string('name', 255).notNullable().unique();
        tbl.text('description').notNullable();
        tbl.string('img');
        tbl.string('link').notNullable();
        tbl.string('deployed');
        tbl.string('role');
        tbl.text('techUsed');
        tbl.integer('team_members');
        tbl.integer('weeks_completed');
        tbl.text('contribution');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('projects');
};
