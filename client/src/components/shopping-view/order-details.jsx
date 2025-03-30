import { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  ShoppingBag,
  MapPin,
  BadgeDollarSign,
  ChevronDown,
  ChevronUp,
  BadgeInfo,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false); // State để mở rộng/thu gọn

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Hàm để rút ngắn OrderId
  const shortenOrderId = (id) => {
    if (!id) return "N/A";
    return id.length > 8 ? `${id.slice(0, 8)}...` : id;
  };

  return (
    <DialogContent className="sm:max-w-[600px] p-6">
      <div className="grid gap-6">
        {/* Header Section - Thông tin đơn hàng */}
        <div className="pt-6 pl-6 pr-6">
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-medium">Thông tin đơn hàng</h3>
            </div>
            <Badge
              className={`px-4 py-1 ml-auto text-xs font-medium bg-green-500 rounded-full hover:bg-green-600 
                ${orderDetails?.orderStatus === "Đã xác nhận"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : orderDetails?.orderStatus === "Đang xử lý"
                   ? "bg-yellow-500 hover:bg-yellow-600"
                  : orderDetails?.orderStatus === "Đang giao hàng"
                  ? "bg-green-500 hover:bg-green-600"
                  : orderDetails?.orderStatus === "Đã nhận hàng"
                        ? "bg-teal-500 hover:bg-teal-600"
                        : orderDetails?.orderStatus === "Bị từ chối"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-800 hover:bg-gray-900"
                }`}
            >
              {orderDetails?.orderStatus || "confirmed"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-400" />
              <div>
                <div className="mb-1 text-xs text-gray-500">ID Đơn Hàng</div>
                <div className="font-medium">
                  {shortenOrderId(orderDetails?._id)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <div>
                <div className="mb-1 text-xs text-gray-500">Ngày đặt</div>
                <div className="font-medium">
                  {orderDetails?.orderDate?.split("T")[0] || ""}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BadgeDollarSign className="w-5 h-5 text-gray-400" />
              <div>
                <div className="mb-1 text-xs text-gray-500">Đơn giá</div>
                <div className="font-medium">${orderDetails?.totalAmount}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  Phương thức thanh toán
                </div>
                <div className="font-medium">
                  {orderDetails?.paymentMethod || "Thanh toán khi nhận hàng"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BadgeInfo className="w-5 h-5 text-gray-400" />
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  Trạng thái thanh toán
                </div>
                <div className="font-medium">
                  {orderDetails?.paymentStatus || "Chưa thanh toán"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <div>
                <div className="mb-1 text-xs text-gray-500">
                  Trạng thái giao hàng
                </div>
                <div className="font-medium">
                  {orderDetails?.orderStatus || "confirmed"}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />
        </div>
        {/* Chi tiết đơn hàng */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div
              className="flex items-center justify-between p-4 border-b cursor-pointer bg-gradient-to-r from-primary/10 to-primary/5"
              onClick={toggleExpand}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary">
                  Chi tiết đơn hàng
                </h3>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-primary" />
              )}
            </div>

            {isExpanded && (
              <div className="p-0">
                <ul className="divide-y divide-gray-200 divide-dashed">
                  {orderDetails?.cartItems &&
                    orderDetails?.cartItems.length > 0 ? (
                    orderDetails.cartItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex items-center flex-1 gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="font-medium max-w-[250px] truncate">
                            {item.title}
                          </span>
                        </div>

                        {/* Căn chỉnh số lượng và giá *màn hình dưới 640px thì ẩn */}
                        <div className="flex items-center min-w-[150px] justify-between text-right hidden sm:flex">
                          <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full min-w-[60px]">
                            SL: {item.quantity}
                          </span>
                          <span className="font-semibold text-red-700 min-w-[60px]">
                            ${item.price}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="p-6 text-center text-gray-500">
                      Không có sản phẩm
                    </li>
                  )}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Thông tin giao hàng */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Thông tin giao hàng</h3>
            </div>
            <Separator className="mb-3" />
            <div className="grid gap-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">
                  Người nhận:
                </span>
                <span>{user.userName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">
                  Địa chỉ:
                </span>
                <span>{orderDetails?.addressInfo?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">
                  Thành phố:
                </span>
                <span>{orderDetails?.addressInfo?.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">
                  Pincode:
                </span>
                <span>{orderDetails?.addressInfo?.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">
                  Phone:
                </span>
                <span>{orderDetails?.addressInfo?.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground min-w-[100px]">
                  Ghi chú:
                </span>
                <span>
                  {orderDetails?.addressInfo?.notes || "Không có ghi chú"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
