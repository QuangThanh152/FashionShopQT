import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { toast } from "react-toastify";

function ShoppingCheckout() {
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const { approvalURL } = useSelector((state) => state.shopOrder);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [isPaymentStartt, setIsPaymentStart] = useState(false);
    const dispatch = useDispatch();

    console.log("currentSelectedAddress", currentSelectedAddress);

    // Tính tổng giá tiền
    const totalCartAmount =
        cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.reduce(
                (sum, currentItem) =>
                    sum +
                    (currentItem?.salePrice > 0
                        ? currentItem?.salePrice
                        : currentItem?.price) *
                    currentItem?.quantity,
                0
            )
            : 0;

    function handleInitiatePaypalPayment() {
        // Kiểm tra xem giỏ hàng có sản phẩm hay không
        if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
            toast.error("Chưa có sản phẩm để thanh toán!", {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                hideProgressBar: true,
                pauseOnHover: false,
            });
            return; // Dừng hàm nếu giỏ hàng rỗng
        }
        
        // Kiểm tra địa chỉ giao hàng
        if (currentSelectedAddress === null) {
            toast.warning("Vui lòng chọn địa chỉ!", {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                hideProgressBar: true,
                pauseOnHover: false,
            });
            return;
        }
        // Kiểm tra dữ liệu cartItems
        // if (!cartItems || !cartItems.items || !Array.isArray(cartItems.items)) {
        //     console.error("Dữ liệu cartItems không hợp lệ hoặc không chứa items:", cartItems);
        //     return;
        //   }
        //   // In dữ liệu cartItems trước khi xử lý
        //   console.log("Dữ liệu cartItems trước khi gửi:", cartItems);

        //   // Kiểm tra từng phần tử trong cartItems.items
        //   cartItems.items.forEach((item, index) => {
        //     console.log(`Phần tử ${index}:`, item);
        //     if (!item.productId || !item.title || typeof item.salePrice !== "number" || !item.quantity) {
        //       console.error(`Phần tử không hợp lệ tại ${index}:`, item);
        //     }
        //   });
        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map((singleCartItem) => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                price:
                    singleCartItem?.salePrice > 0
                        ? singleCartItem?.salePrice
                        : singleCartItem?.price,
                quantity: singleCartItem?.quantity,
            })),
            addressInfo: {
                addressId: currentSelectedAddress?._id,
                address: currentSelectedAddress?.address,
                city: currentSelectedAddress?.city,
                pincode: currentSelectedAddress?.pincode,
                phone: currentSelectedAddress?.phone,
                notes: currentSelectedAddress?.notes,
            },
            orderStatus: "pending",
            paymentMethod: "paypal",
            paymentStatus: "pending",
            totalAmount: totalCartAmount,
            orderDate: new Date(),
            orderUpdatedDate: new Date(),
            paymenId: "",
            payerId: "",
        };

        // console.log("Dữ liệu orderData:", orderData);

        dispatch(createNewOrder(orderData)).then((data) => {
            // console.log(data, "qthanh");
            if (data?.payload?.success) {
                setIsPaymentStart(true);
            } else {
                setIsPaymentStart(false);
            }
        });
    }

    if (approvalURL) {
        window.location.href = approvalURL
    }
    return (
        <div className="flex flex-col">
            {/* anh bia */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    src={img || "/placeholder.svg"}
                    className="object-cover object-center w-full h-full"
                    alt="Banner"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <h1 className="text-3xl font-bold text-white">Thanh Toán</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 p-5 mt-5 sm:grid-cols-2">
                <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
                <div className="p-4 bg-white rounded-lg shadow-lg">
                    <h2 className="flex items-center mb-4 text-lg font-semibold">
                        <ShoppingBagIcon className="w-5 h-5 mr-2" />
                        Giỏ hàng của bạn
                    </h2>

                    <div className="flex flex-col gap-4 max-h-[525px] overflow-y-auto pr-2">
                        {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                            cartItems.items.map((item) => (
                                <UserCartItemsContent key={item.id} cartItems={item} />
                            ))
                        ) : (
                            <div className="py-4 text-center text-gray-500">
                                <p>Không có sản phẩm trong giỏ hàng</p>
                            </div>
                        )}
                    </div>

                    {/* Thông tin tổng giá */}
                    <div className="pt-4 mt-4 border-t">
                        <div className="flex items-center justify-between py-2 font-bold">
                            <span>Tổng:</span>
                            <span>$ {totalCartAmount.toFixed(2)}</span>
                        </div>

                        <Button
                            onClick={handleInitiatePaypalPayment}
                            className="w-full mt-4"
                        >
                            Thanh Toán Đơn Hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;
