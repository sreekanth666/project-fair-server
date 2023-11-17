const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || 'image/jpeg' || 'image/jpg') {
        callback(null, true)        
    } else {
        callback(null, false)
        return callback(new Error("Only PNG, JPG and JPEG file formats are allowed"))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig