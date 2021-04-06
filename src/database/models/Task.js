const { Model } = require('objection');

class Task extends Model {
    static get tableName() {
        return 'tasks'
    }

    static get relationMappings() {
        const User = require('./User');
        return {
            user: {
                relation: Model.HasOneRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'tasks.id_user'
                }
            }
        }
    }
}

module.exports = Task;