const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const productController = require('../controllers/productController');

// toutes les routes produit sont protégées
router.use(verifyToken);

router.post('/', productController.createProduct);
router.get('/', productController.getMyProducts);
router.get('/:id', productController.getMyProductById);
router.patch('/:id', productController.updateMyProduct);
router.delete('/:id', productController.deleteMyProduct);

module.exports = router;
