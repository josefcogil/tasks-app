const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const controller = require('../controllers/users.controller');

router.post('/', controller.create);

router.get('/', controller.find);

router.get('/:id', controller.findOne);


router.put('/:id', verifyToken, controller.update);

router.delete('/:id', verifyToken, controller.delete);

module.exports = router;