const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Thêm giỏ hàng
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required",
            });
        }
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId is required",
            });
        }
        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "quantity must be greater than 0",
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm",
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity;
        }
        await cart.save();
        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error addToCart",
        });
    }
};

// lấy sản phẩm
const fetchCartItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is manadatory!",
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        const validItems = cart.items.filter(
            (productItem) => productItem.productId
        );

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

// cập nhật giỏ hàng
const updateCartItemQty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "invalid data provided",
            });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy trong giỏ hàng!",
            });
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (findCurrentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Không có mặt hàng trong giỏ hàng!",
            });
        }

        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Không tìm thấy sản phẩm",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error updateCartItemQty",
        });
    }
};

// xóa sản phẩm
const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId và productId là bắt buộc",
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy trong giỏ hàng!",
            });
        }

        // Kiểm tra xem sản phẩm có trong giỏ hàng không
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không có trong giỏ hàng!",
            });
        }
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Không tìm thấy sản phẩm",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart.toObject(),
                items: populateCartItems,
            },
        });
    } catch (error) {
        console.error("Lỗi trong deleteCartItem:", error);
        res.status(500).json({
            success: false,
            message: "Error deleteCartItem",
        });
    }
};

module.exports = {
    addToCart,
    fetchCartItems,
    deleteCartItem,
    updateCartItemQty,
};
