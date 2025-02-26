const { imageUploadUtil } = require("../../helpers/Cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({
                success: false,
                message: "Không thể up và tải file!"
            });
        }

        const result = await imageUploadUtil(req.file.buffer);

        res.json({
            success: true,
            message: "Upload ảnh thành công",
            result
        });
    } catch (error) {
        console.error("Error in handleImageUpload:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// Theem 1 san pham moi
const addNewProducts = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!title || !price || !totalStock || !category) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập đủ (title, price, totalStock, category)"
            });
        }
        if (isNaN(price) || isNaN(totalStock) || price < 0 || totalStock < 0) {
            return res.status(400).json({
                success: false,
                message: "Giá và tổng số lượng phải là số dương"
            });
        }

        const newlyCreatedProduct = new Product({
            image: image || '', // Đảm bảo image là chuỗi hoặc URL hợp lệ
            title,
            description: description || '',
            category,
            brand: brand || '',
            price: parseFloat(price),
            salePrice: salePrice ? parseFloat(salePrice) : 0,
            totalStock: parseInt(totalStock)
        });

        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
            message: "Thêm sản phẩm mới thành công"
        });
    } catch (error) {
        console.error("Error in addNewProducts:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// fecth tat ca san pham
const fetchAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const listOfProducts = await Product.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo, mới nhất trước

        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            success: true,
            data: listOfProducts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                totalItems: totalProducts
            }
        });
    } catch (error) {
        console.error("Error in fetchAllProducts:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

// chinh sua san pham dua vao id
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;

        // Kiểm tra sản phẩm tồn tại
        const findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Cập nhật các trường nếu có
        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (brand) updateData.brand = brand;
        if (price) updateData.price = parseFloat(price);
        if (salePrice) updateData.salePrice = parseFloat(salePrice);
        if (totalStock) updateData.totalStock = parseInt(totalStock);
        if (image) updateData.image = image;

        // Sử dụng findByIdAndUpdate để cập nhật
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Đã cập nhật sản phẩm thành công"
        });
    } catch (error) {
        console.error("Error in editProduct:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};
// xoa san pham dua vao id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra quyền (giả sử sử dụng middleware auth)
        // if (!req.user.isAdmin) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "Unauthorized access"
        //     });
        // }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công"
        });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};
module.exports = {
    handleImageUpload,
    addNewProducts,
    fetchAllProducts,
    editProduct,
    deleteProduct
}