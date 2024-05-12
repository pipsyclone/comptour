import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else (
        { 'error': 'Gambar yang anda masukkan tidak sesuai, silahkan unggah dengan tipe JPEG/PNG/JPG' },
        false
    )
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter
})

export default upload;