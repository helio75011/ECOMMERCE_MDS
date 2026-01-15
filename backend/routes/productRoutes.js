const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/upload')
const requireRole = require('../middlewares/requireRole');

// toutes les routes produit sont protégées
// router.use(verifyToken);

router.post('/', verifyToken, productController.createProduct);
router.post('/:id/image', verifyToken, requireRole('admin'), upload.single('image'), productController.uploadProductImage);
router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProductById);
router.patch('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
