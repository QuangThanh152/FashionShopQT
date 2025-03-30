import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import {
  Package,
  Calendar,
  CreditCard,
  Truck,
  ShoppingBag,
  MapPin,
  Settings,
  BadgeInfo,
  BadgeDollarSign,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "react-toastify";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [isExpanded, setIsExpanded] = useState(false); // State để mở rộng/thu gọn

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Hàm để rút ngắn OrderId
  const shortenOrderId = (id) => {
    if (!id) return "N/A";
    return id.length > 8 ? `${id.slice(0, 8)}...` : id;
  };

  function handleUpdateStatus(event) {
    event.preventDefault();
    // console.log(formData);

    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      // console.log(data, '123');
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success("Cập nhật đơn hàng thành công", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        })
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] p-6">
      <div className="grid gap-6">
        {/* Header Section */}
        <div className="pt-6 pl-6 pr-6">
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-medium">Quản lý đơn hàng</h3>
            </div>
            <Badge
              className={`px-4 py-1 ml-auto text-xs font-medium rounded-full
                ${orderDetails?.orderStatus === "Đã xác nhận"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : orderDetails?.orderStatus === "Đang xử lý"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : orderDetails?.orderStatus === "Đang giao hàng"
                      ? "bg-green-500 hover:bg-green-600"
                      : orderDetails?.orderStatus === "Đã nhận hàng"
                        ? "bg-teal-500 hover:bg-teal-600"
                        : orderDetails?.orderStatus === "Từ chối"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-800 hover:bg-gray-900"
                }`}
            >
              {orderDetails?.orderStatus || "Đang xử lý"}
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

        {/* chi tiết đơn hàng */}
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
                    { id: "confirmed", label: "Đã xác nhận" }, // Thêm trạng thái confirmed
                    { id: "shipped", label: "Đang giao hàng" }, // Thay "inShipping" -> "shipped"
                    { id: "delivered", label: "Đã giao" },
                    { id: "rejected", label: "Từ chối" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Cập nhật trạng thái"}
              onSubmit={handleUpdateStatus}
            />
          </CardContent>
        </Card>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
