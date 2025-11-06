const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image.png', 'image.webp'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Format de fichier non supporté'), false);
};

module.exports = multer({ storage, fileFilter });