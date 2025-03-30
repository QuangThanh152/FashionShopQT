const Order = require("../../models/Order");

const getAllOrdersAllUsers = async (req, res) => {
    try {
        const orders = await Order.find({});

        // kiểm tra tất cả đơn hàng
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng!",
            });
        }

        // res.status(200).json({
        //     success: true,
        //     data: orders,
        // });
        const statusMapping = {
            "confirmed": "Đã xác nhận",
            "pending": "Đang xử lý",
            "shipped": "Đang giao hàng",
            "delivered": "Đã nhận hàng",
            "rejected": "Từ chối",
        };
        
        // Chuyển đổi trạng thái đơn hàng trước khi trả về
        const translatedOrders = orders.map(order => ({
            ...order._doc,
            orderStatus: statusMapping[order.orderStatus] || order.orderStatus,
        }));
        
        res.status(200).json({
            success: true,
            data: translatedOrders,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr getAllOrdersAllUsers-orders-controller",
        });
    }
};

const getOrderDetailsForAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id);

        // kiểm tra 1 đơn hàng
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng!",
            });
        }

        // res.status(200).json({
        //     success: true,
        //     data: order,
        // });

        const statusMapping = {
            "confirmed": "Đã xác nhận",
            "pending": "Đang xử lý",
            "shipped": "Đang giao hàng",
            "delivered": "Đã nhận hàng",
            "rejected": "Từ chối",
        };
        
        // Chuyển đổi trạng thái đơn hàng trước khi trả về
        const translatedOrder = {
            ...order._doc,
            orderStatus: statusMapping[order.orderStatus] || order.orderStatus,
        };
        
        res.status(200).json({
            success: true,
            data: translatedOrder,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some erorr getOrderDetailsForAdmin-orders-controller",
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        // await Order.findByIdAndUpdate(id, { orderStatus });
        const statusMappingReverse = {
            "Xác nhận": "confirmed",
            "Đang xử lý": "pending",
            "Đang giao hàng": "shipped",
            "Đã nhận hàng": "delivered",
            "Từ chối": "rejected",
        };
        
        // Chuyển đổi trạng thái tiếng Việt sang tiếng Anh
        const englishStatus = statusMappingReverse[orderStatus] || orderStatus;
        
        await Order.findByIdAndUpdate(id, { orderStatus: englishStatus });
        

        res.status(200).json({
            success: true,
            message: "Order status is updated successfully!",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

module.exports = { getAllOrdersAllUsers, getOrderDetailsForAdmin, updateOrderStatus };
