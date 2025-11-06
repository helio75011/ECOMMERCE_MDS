const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, orderController.createOrder);

router.get('/', verifyToken, async (req, res) => {
    const orders = await Order.find({ user: req.user.userId }).populate('products.product');
    res.status(200).json(orders);
});

module.exports = router;