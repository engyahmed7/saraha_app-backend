const multer = require("multer");
const path = require('path');
const fs = require('fs');

const validationType = {
    image: ['image/png', 'image/jpg', 'image/jpeg'],
    files: ['application/pdf']
}

function multerFn(customDest, acceptType) {
    if (!customDest || customDest == '') {
        customDest = "GeneralData"
    }
    if (!fs.existsSync(path.join(__dirname, `../uploads/${customDest}`))) {
        fs.mkdirSync(path.join(__dirname, `../uploads/${customDest}`), {
            recursive: true
        })
    }
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            req.destination = `uploads/${customDest}`;
            cb(null, path.join(__dirname, `../uploads/${customDest}`))
        },
        filename: (req, file, cb) => {
            const fullName = "saraha-" + new Date().getTime() + '-' + file.originalname
            cb(null, fullName);
        },
    })

    const fileFilter = (req, file, cb) => {
        // if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        //     cb(null, true);
        // } else {
        //     req.fileUploadError = true;
        //     cb(null, false);
        // }
        if (acceptType.includes(file.mimetype)) {
            cb(null, true);
        } else {
            req.fileUploadError = true;
            cb(null, false);
        }
    }
    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        dest: path.join(__dirname, `../uploads/${customDest}`)
    })

    return upload;
}

module.exports = {
    multerFn,
    validationType
};