const paypal = require("../../helpers/paypal");
const Order = require("../../models/Order");

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
            paymenId,
            payerId,
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
                            price: item.salePrice.toFixed(2),
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
                console.log(error);

                res.status(500).json({
                    success: false,
                    message: "Lỗi trong khi thanh toán!",
                });
            } else {
                const newlyCreatedOrder = new Order({
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdatedDate,
                    paymenId,
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

const capturePayment = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr capturePayment-orders-controller",
        });
    }
};

module.exports = {
    createOrder,
    capturePayment,
};
