const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }

        let sort = {};

        // xắp xếp theo giá tiền
        switch (sortBy) {
            // Sắp xếp giá từ thấp đến cao
            case "price-lowtohigh":
                sort.salePrice = 1;
                break;

            // Sắp xếp giá từ cao đến thấp
            case "price-hightolow":
                sort.salePrice = -1;
                break;

            // A - Z
            case "title-atoz":
                sort.title = 1;
                break;

            // Z - A
            case "title-ztoa":
                sort.title = -1;
                break;

            default:
                // Mặc định sắp xếp giá từ thấp đến cao
                sort.price = 1;
                break;
        }

        // hàm xếp từ A - Z, Z - A
        const products = await Product.find(filters)
            .collation({ locale: "vi", strength: 2 })
            .sort(sort);

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm!",
            });

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { getFilteredProducts, getProductDetails };