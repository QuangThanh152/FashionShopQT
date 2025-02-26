const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Cấu hình Cloudinary - Sử dụng biến môi trường thay vì hardcode
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'qthanhcloud',
    api_key: process.env.CLOUDINARY_API_KEY || '657855627964783',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'Scik5qtB1HA-kkObYbKEK1zyeLM',
});

// Cấu hình multer để lưu file trong bộ nhớ (memory storage)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Kiểm tra định dạng file - chỉ chấp nhận ảnh
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF) are allowed.'), false);
    }
    cb(null, true);
};

// Khởi tạo multer với giới hạn kích thước (ví dụ: 5MB) và filter file
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Giới hạn 5MB
});

async function imageUploadUtil(fileBuffer) {
    try {
        // Chuyển buffer thành base64 để upload lên Cloudinary
        const b64 = Buffer.from(fileBuffer).toString('base64');
        const mimeType = 'image/jpeg'; // Có thể động dựa trên file.mimetype nếu cần
        const url = `data:${mimeType};base64,${b64}`;

        // Upload lên Cloudinary với preset mới
        const result = await cloudinary.uploader.upload(url, {
            resource_type: 'image',
            folder: 'products_ShopFashionQT', // Bạn có thể thay đổi thành 'samples/ecommerce' nếu khớp với preset
            upload_preset: 'fashionQTShop_auto' // Cập nhật preset mới
        });

        return result;
    } catch (error) {
        throw new Error(`Cloudinary upload error: ${error.message}`);
    }
}

module.exports = { upload, imageUploadUtil };