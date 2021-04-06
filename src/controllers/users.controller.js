const User = require('../database/models/User');
const bcrypt = require('bcryptjs');


module.exports = {
    create: async (req, res) => {

        let { first_name, last_name, email, password } = req.body;

        let err = false;
        let message = '';

        if (!first_name) { err = true; message = 'First name required' }
        else if (!last_name) { err = true; message = 'Last name required' }
        else if (!email) { err = true; message = 'Email required' }
        else if (!password) { err = true; message = 'Password required' }

        try {
            const user = await User
                .query()
                .where('email', '=', email);

            if (user.length > 0) {
                err = true;
                message = 'Email registered with another user';
            }
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }

        if (err) {
            res.status(500).json({ ok: false, message });
            return;
        }

        let data = {
            first_name,
            last_name,
            email,
            password: bcrypt.hashSync(password, 10)
        }

        try {
            const user = await User
                .query()
                .insert(data);

            res.status(200).json({ ok: true, user });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    find: async (req, res) => {
        try {
            const users = await User
                .query()

            if (users.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find users` });
                return;
            }

            res.status(200).json({ ok: true, users });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User
                .query()
                .where('id', '=', id)
                .withGraphFetched('task');

            if (user.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find user with ID: ${id}` });
                return;
            }

            res.status(200).json({ ok: true, user });
        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    },

    update: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User
                .query()
                .where('id', '=', id)

            if (user.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find user with ID: ${id}` });
                return;
            }

            let data = req.body;

            if (data.password) {
                let match = bcrypt.compareSync(data.password, user.password);
                if (!match) {
                    res.status(500).json({ message: "Password doesn't match" });
                    return;
                }
                data.password = bcrypt.hashSync(data.new_password, 10);
            }

            await User
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
            const user = await User
                .query()
                .where('id', '=', id)

            if (user.length === 0) {
                res.status(404).json({ ok: false, message: `Could not find user with ID: ${id}` });
                return;
            }

            await User
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