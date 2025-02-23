const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'qthanhcloud',
    api_key: '657855627964783',
    api_secret: 'Scik5qtB1HA-kkObYbKEK1zyeLM',
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        upload_preset: 'auto',
    });

    return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };