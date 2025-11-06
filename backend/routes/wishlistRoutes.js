const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, wishlistController.getWishlist);

router.post('/', verifyToken, wishlistController.addToWishlist);

router.delete('/:productId', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;