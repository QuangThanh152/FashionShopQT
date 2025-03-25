import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "../admin-view/order-details";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);    

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lịch sử mua hàng</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center align-middle">ID Đơn hàng</TableHead>
                            <TableHead className="text-center align-middle">Ngày mua</TableHead>
                            <TableHead className="text-center align-middle">Trạng thái</TableHead>
                            <TableHead className="text-center align-middle">Giá trị</TableHead>
                            <TableHead className="text-center align-middle">
                                <span className="sr-only">Chi tiết</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        <TableRow>
                            <TableCell className="text-center align-middle">1</TableCell>
                            <TableCell className="text-center align-middle">2021-07-01</TableCell>
                            <TableCell className="text-center align-middle">Đã giao</TableCell>
                            <TableCell className="text-center align-middle">100.000</TableCell>
                            <TableCell className="text-center align-middle">
                                <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
                                    <Button variant="outline" size="sm" onClick={() => setOpenDetailsDialog(true)}>
                                        Chi tiết
                                    </Button>
                                    
                                    <ShoppingOrderDetailsView />
                                </Dialog>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default ShoppingOrders;