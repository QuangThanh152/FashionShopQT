import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllOrdersByUser,
    getOrderDetails,
    resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetails(getId));
    }
    // Hàm để rút ngắn OrderId
    const shortenOrderId = (id) => {
        if (!id) return "N/A";
        return id.length > 8 ? `${id.slice(0, 8)}...` : id;
    };
    useEffect(() => {
        if (user?.id) {
            dispatch(getAllOrdersByUser(user?.id));
        }
    }, [dispatch, user?.id]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);
    console.log("orderDetails", orderDetails);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lịch sử mua hàng</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center align-middle">
                                ID Đơn hàng
                            </TableHead>
                            <TableHead className="text-center align-middle">
                                Ngày mua
                            </TableHead>
                            <TableHead className="text-center align-middle">
                                Trạng thái
                            </TableHead>
                            <TableHead className="text-center align-middle">
                                Giá trị
                            </TableHead>
                            <TableHead className="text-center align-middle">
                                <span className="sr-only">Chi tiết</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {orderList && orderList.length > 0 ? (
                            orderList.map((orderItem) => (
                                <TableRow key={orderItem._id}>
                                    <TableCell className="text-center align-middle">
                                        {shortenOrderId(orderItem._id)}
                                    </TableCell>
                                    <TableCell className="text-center align-middle">
                                        {orderItem.orderDate.split("T")[0]}
                                    </TableCell>
                                    <TableCell className="text-center align-middle">
                                        <Badge
                                            className={`py-1 px-3 rounded-2xl 
                                           ${orderItem?.orderStatus ===
                                                    "Đã xác nhận"
                                                    ? "bg-blue-500 hover:bg-blue-600"
                                                    : orderItem?.orderStatus ===
                                                        "Đang xử lý"
                                                        ? "bg-yellow-500 hover:bg-yellow-600"
                                                        : orderItem?.orderStatus ===
                                                            "Đang giao hàng"
                                                            ? "bg-green-500 hover:bg-green-600"
                                                            : orderItem?.orderStatus ===
                                                                "Đã nhận hàng"
                                                                ? "bg-teal-500 hover:bg-teal-600"
                                                                : orderItem?.orderStatus ===
                                                                    "Bị từ chối"
                                                                    ? "bg-red-600 hover:bg-red-700"
                                                                    : "bg-gray-800 hover:bg-gray-900"
                                                }`}
                                        >
                                            {orderItem.orderStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center align-middle">
                                        ${orderItem.totalAmount}
                                    </TableCell>
                                    <TableCell className="text-center align-middle">
                                        <Dialog
                                            open={openDetailsDialog}
                                            onOpenChange={() => {
                                                setOpenDetailsDialog(false);
                                                dispatch(resetOrderDetails());
                                            }}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleFetchOrderDetails(orderItem?._id)}
                                            >
                                                Chi tiết
                                            </Button>
                                            <ShoppingOrderDetailsView orderDetails={orderDetails} />
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    Không có đơn hàng nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default ShoppingOrders;
