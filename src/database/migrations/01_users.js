exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    })
}

exports.down = knex => {
    return knex.schema.dropTableIfExists('users');
}