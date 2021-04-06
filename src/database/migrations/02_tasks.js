exports.up = knex => {
    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.boolean('done').notNullable();
        table.integer('id_user').references('id').inTable('users');
    })
}

exports.down = knex => {
    return knex.schema.dropTableIfExists('tasks');
}