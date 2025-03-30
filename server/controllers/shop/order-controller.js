const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


// tạo đơn hàng
const createOrder = async (req, res) => {
    try {
        const {
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdatedDate,
            paymentId,
            payerId,
            cartId
        } = req.body;

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://localhost:5173/shop/paypal-return",
                cancel_url: "http://localhost:5173/shop/paypal-cancel",
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: "USD",
                            quantity: item.quantity,
                        })),
                    },
                    amount: {
                        currency: "USD",
                        total: totalAmount.toFixed(2),
                    },
                    description: "This is the payment description.",
                },
            ],
        };

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error("PayPal Error:", error.response || error);
                res.status(500).json({
                    success: false,
                    message: "Lỗi trong khi thanh toán qua PayPal!",
                    error: error.response?.message || "Unknown error",
                });
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdatedDate,
                    paymentId,
                    payerId,
                });

                await newlyCreatedOrder.save();

                const approvalURL = paymentInfo.links.find(
                    (link) => link.rel === "approval_url"
                ).href;

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id,
                    message: "Đơn hàng đã được tạo thành công!",
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr create-orders-controller",
        });
    }
};


// xác nhận thanh toán và cập nhật trạng thái đơn hàng
const capturePayment = async (req, res) => {
    try {
        const { paymentId, payerId, orderId } = req.body

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng!",
            });
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed';
        order.paymenId = paymentId;
        order.payerId = payerId;

        for(let item of order.cartItems) {
            let product = await Product.findById(item.productId)

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Không đủ hàng cho sản phẩm này ${product.title}`
                })
            }

            product.totalStock -= item.quantity

            await product.save();
            
        }

        const getCartId = order.cartId;


        await Cart.findByIdAndDelete(getCartId)

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Đã xác nhận đơn hàng!',
            data: order
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr capturePayment-orders-controller",
        });
    }
};

// const capturePayment = async (req, res) => {
//     try {
//         const { paymentId, payerId, orderId } = req.body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!paymentId || !payerId || !orderId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Thiếu thông tin paymentId, payerId hoặc orderId!",
//             }); 
//         }

//         const order = await Order.findById(orderId);

//         if (!order) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Không tìm thấy đơn hàng!",
//             });
//         }

//         // Xác nhận thanh toán qua PayPal
//         const payment = await paypal.payment.execute(paymentId, { payer_id: payerId });

//         // Cập nhật trạng thái đơn hàng
//         order.paymentStatus = 'paid';
//         order.orderStatus = 'confirmed';
//         order.paymentId = paymentId;
//         order.payerId = payerId;

//         const getCartId = order.cartId;
//         if (getCartId) {
//             await Cart.findByIdAndDelete(getCartId);
//         }

//         await order.save();

//         res.status(200).json({
//             success: true,
//             message: 'Đã xác nhận đơn hàng!',
//             data: order,
//         });
//     } catch (error) {
//         console.error("Error in capturePayment:", error);
//         res.status(500).json({
//             success: false,
//             message: "Some error in capturePayment-orders-controller",
//         });
//     }
// };

// lấy tất cả đơn hàng của một người dùng.
const getAllOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId });

        // kiểm tra tất cả đơn hàng
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng!"
            })
        }

        // res.status(200).json({
        //     success: true,
        //     data: orders
        // })
        const statusMapping = {
            "confirmed": "Đã xác nhận",
            "pending": "Đang xử lý",
            "shipped": "Đang giao hàng",
            "delivered": "Đã nhận hàng",
            "rejected": "Bị từ chối",
        };
        
        // Chuyển đổi trạng thái đơn hàng trước khi trả về
        const translatedOrders = orders.map(order => ({
            ...order._doc,
            orderStatus: statusMapping[order.orderStatus] || order.orderStatus,
        }));
        
        res.status(200).json({
            success: true,
            data: translatedOrders
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr getAllOrdersByUser-orders-controller",
        });
    }
}

// lấy chi tiết một đơn hàng.
const getOrderDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        // kiểm tra 1 đơn hàng
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng!"
            })
        }

        // res.status(200).json({
        //     success: true,
        //     data: order
        // })

        const statusMapping = {
            "confirmed": "Đã xác nhận",
            "pending": "Đang xử lý",
            "shipped": "Đang giao hàng",
            "delivered": "Đã nhận hàng",
            "rejected": "Bị từ chối",
        };
        
        // Chuyển đổi trạng thái đơn hàng trước khi trả về
        const translatedOrder = {
            ...order._doc,
            orderStatus: statusMapping[order.orderStatus] || order.orderStatus,
        };
        
        res.status(200).json({
            success: true,
            data: translatedOrder
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr getOrderDetais-orders-controller",
        });
    }
}
module.exports = {
    createOrder,
    capturePayment,
    getAllOrdersByUser,
    getOrderDetails
};
