const Task = require('../database/models/Task');

module.exports = {
    create: async (req, res) => {

        let { title, description } = req.body;

        let err = false;
        let message = '';

        if (!title) { err = true; message = 'Title required' }
        else if (!description) { err = true; message = 'Description required' }

        if (err) {
            res.status(500).json({ ok: false, message });
            return;
        }

        let data = {
            title,
            description,
            done: false,
            id_user: req.id_user
        }

        try {
            const task = await Task
                .query()
                .insert(data);

            res.status(200).json({ ok: true, task });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    find: async (req, res) => {
        try {
            const tasks = await Task
                .query()
                .where('id_user', '=', req.id_user)
                .orderBy('id', 'ASC')


            if (tasks.length === 0) {
                console.log('No')
                res.render('tasks');
                return;
            }

            res.render('tasks', { tasks });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;

        try {
            const task = await Task
                .query()
                .findById(id)
                .withGraphFetched('user')

            if (task.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find task with ID: ${id}` });
                return;
            }

            res.status(200).json({ ok: true, task });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    update: async (req, res) => {
        const { id } = req.params;

        try {
            const task = await Task
                .query()
                .findById(id)

            if (task.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find task with ID: ${id}` });
                return;
            }

            let data = req.body;

            await Task
                .query()
                .update(data)
                .where('id', '=', id)

            res.status(200).json({ ok: true });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            const task = await Task
                .query()
                .where('id', '=', id)

            if (task.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find task with ID: ${id}` });
                return;
            }

            await Task
                .query()
                .deleteById(id)

            res.status(200).json({ ok: true });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    }
}