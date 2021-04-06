const bcrypt = require('bcryptjs');

exports.seed = async knex => {

    try {
        console.log('Deleting Data...');
        await Promise.all([

            await knex('users').del(),
            await knex('tasks').del(),

            await knex('users')
                .insert([
                    {
                        first_name: 'Jose',
                        last_name: 'Gil',
                        email: 'jose@email.com',
                        password: bcrypt.hashSync('1234', 10)
                    },
                    {
                        first_name: 'Juan',
                        last_name: 'Barrios',
                        email: 'juan@gmail.com',
                        password: bcrypt.hashSync('1234', 10)
                    }
                ]),

            await knex('tasks')
                .insert([
                    {
                        title: 'Task 1',
                        description: 'Description for task 1',
                        done: false,
                        id_user: 1
                    },
                    {
                        title: 'Task 2',
                        description: 'Description for task 2',
                        done: false,
                        id_user: 2
                    },
                    {
                        title: 'Task 3',
                        description: 'Description for task 3',
                        done: true,
                        id_user: 1
                    }
                ]),

            console.log('Done')
        ])

    } catch (err) {
        console.log(err)
    }

}