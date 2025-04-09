const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = 'uploads/others'; // default folder

        // Tentukan folder berdasarkan nama field (fieldname)
        switch (file.fieldname) {
            case 'profileImage':
                folder = 'uploads/profile';
                break;
            case 'articleImage':
                folder = 'uploads/article';
                break;
            case 'campaignImage':
                folder = 'uploads/campaign';
                break;
        }

        // Pastikan folder ada
        fs.mkdirSync(folder, { recursive: true });

        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Filter hanya menerima gambar (jpg, png, jpeg)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images (jpg, jpeg, png) are allowed'));
    }
};

// Middleware multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Maksimal 5MB
});

module.exports = upload;
