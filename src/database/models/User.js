const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        const Task = require('./Task');
        return {
            task: {
                relation: Model.HasManyRelation,
                modelClass: Task,
                join: {
                    from: 'tasks.id_user',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = User;