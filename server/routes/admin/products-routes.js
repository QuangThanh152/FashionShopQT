
const express = require('express');

const {
    handleImageUpload,
    addNewProducts,
    fetchAllProducts,
    editProduct,
    deleteProduct
} = require('../../controllers/admin/products-controller');

const { upload } = require('../../helpers/Cloudinary');

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add-new-product", addNewProducts);
router.get("/fetch-all-products", fetchAllProducts);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;