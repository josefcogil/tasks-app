const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

module.exports = {
    verifyToken: async (req, res, next) => {
        const token = req.headers['token'];

        if (!token) {
            res.render('403', { layout: 'out.hbs' });
            return;
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        let user = await User
            .query()
            .findById(decoded.id_user)

        if (user.length === 0) {
            res.status(404).json({ ok: false, message: `User not registered` });
            return;
        }

        req.id_user = decoded.id_user;

        next();
    }
}