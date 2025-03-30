import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import AdminOrderDetailsView from "./order-details";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
    getAllOrdersForAdmin,
    getOrderDetailsForAdmin,
    resetOrderDetails,
} from "@/store/admin/order-slice";

function AdminOrdersView() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

    const dispatch = useDispatch();
    // Hàm để rút ngắn OrderId
    const shortenOrderId = (id) => {
        if (!id) return "N/A";
        return id.length > 8 ? `${id.slice(0, 8)}...` : id;
    };

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(() => {
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (orderDetails !== null) setOpenDetailsDialog(true);
    }, [orderDetails]);

    console.log("orderDetails", orderDetails);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tất cả lịch sử mua hàng</CardTitle>
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
                                                                    "Từ chối"
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
                                            <AdminOrderDetailsView orderDetails={orderDetails} />
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

export default AdminOrdersView;
