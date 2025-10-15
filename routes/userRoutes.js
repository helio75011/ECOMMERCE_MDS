const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController')
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/upload');

// // Admin
// const requireRole = require('../middlewares/requireRole');

// Routes Publiques
router.post('/', userController.createUser);
router.post('/login', userController.login);

// Admin
router.get('/admin', verifyToken, adminController.getAdmin);
// Routes avec Authentification
router.get('/', verifyToken, userController.getAllUsers);
router.get('/:id', verifyToken, userController.getUserById);
router.patch('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

// upload
router.patch('/profile-pic', verifyToken, upload.single('profilePic'), userController.uploadProfilePic);


module.exports = router;