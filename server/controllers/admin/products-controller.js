const { imageUploadUtil } = require("../../helpers/Cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data: " + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            message: "Image uploaded successfully",
            result
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Theem 1 san pham moi
const addNewProducts = async (req, res) => {
    try {
        const { image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;

        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            total
        });

        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
            message: "Product added successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// fecth tat ca san pham
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find();
        res.status(200).json({
            success: true,
            data: listOfProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// chinh sua san pham dua vao id
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const { image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        } = req.body;

        const findProduct = await Product.findById(id);
        if (!findProduct)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        Product.title = title || findProduct.title;
        Product.description = description || findProduct.description;
        Product.category = category || findProduct.category;
        Product.brand = brand || findProduct.brand;
        Product.price = price || findProduct.price;
        Product.salePrice = salePrice || findProduct.salePrice;
        Product.totalStock = totalStock || findProduct.totalStock;
        Product.image = image || findProduct.image;

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct,
            message: "Product updated successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// xoa san pham dua vao id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        res.status(200).json({
            success: true,
            message: "Product delete successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
module.exports = {
    handleImageUpload,
    addNewProducts,
    fetchAllProducts,
    editProduct,
    deleteProduct
}