const User = require('../database/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    render: (req, res) => {
        res.render('login', { layout: 'out.hbs' })
    },

    login: async (req, res) => {
        let { email, password } = req.body;

        try {
            const user = await User
                .query()
                .where('email', '=', email)

            if (user.length === 0) {
                res.status(404).json({ ok: false, message: `Email not registered` });
                return;
            }

            let match = bcrypt.compareSync(password, user[0].password);

            if (!match) {
                res.status(401).json({ ok: false, message: `Invalid password` });
                return;
            }

            const token = jwt.sign({ id_user: user[0].id }, process.env.SECRET, {
                expiresIn: 86400
            })

            res.status(200).json({ ok: true, token });

        } catch (err) {
            res.status(500).json({ message: 'Database error' });
            console.log(err);
            return;
        }
    }
}