"use client"

import { useState } from "react"
import CommonForm from "../common/form"
import { DialogContent } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Package, Calendar, CreditCard, Truck, ShoppingBag, MapPin, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const initialFormData = {
  status: "",
}

function AdminOrderDetailsView() {
  const [formData, setFormData] = useState(initialFormData)

  function handleUpdateStatus(e) {
    e.preventDefault()
  }

  return (
    <DialogContent className="sm:max-w-[600px] p-6">
      <div className="grid gap-6">
        {/* Header Section */}
        <div className="grid gap-4 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Quản lý đơn hàng</h3>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              Đang giao hàng
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">ID Đơn Hàng:</span>
              <span className="text-sm">2323</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Ngày đặt:</span>
              <span className="text-sm">24/03/2025</span>
            </div>

            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Đơn giá:</span>
              <span className="text-sm font-semibold text-primary">$1000</span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Trạng thái:</span>
              <span className="text-sm">Đang giao hàng</span>
            </div>
          </div>
        </div>

        {/* Order Details Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Chi tiết đơn hàng</h3>
            </div>
            <Separator className="mb-3" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                <span className="font-medium">Sản Phẩm 1</span>
                <span className="font-semibold text-primary">$1000</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Shipping Information Section */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Thông tin giao hàng</h3>
            </div>
            <Separator className="mb-3" />
            <div className="grid gap-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">Người nhận:</span>
                <span>QuangThanh</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">Địa chỉ:</span>
                <span>Địa chỉ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">Thành phố:</span>
                <span>Thành phố</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">Pincode:</span>
                <span>Pincode</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">Phone:</span>
                <span>Phone</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">Ghi chú:</span>
                <span>Ghi chú</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Status Section */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Cập nhật trạng thái</h3>
            </div>
            <Separator className="mb-3" />
            <CommonForm
              formControls={[
                {
                  label: "Trạng thái giao hàng",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Chờ xác nhận" },
                    { id: "inProcess", label: "Chờ Lấy hàng" },
                    { id: "inShipping", label: "Chờ giao hàng" },
                    { id: "delivered", label: "Đã giao" },
                    { id: "rejected", label: "Đã hủy" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Cập nhật trạng thái"}
              onSubmit={() => handleUpdateStatus()}
            />
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  )
}

export default AdminOrderDetailsView

