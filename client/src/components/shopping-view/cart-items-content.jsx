import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

function UserCartItemsContent({ cartItems }) {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
    function handleCartItemDelete(getCartItem) {
        dispatch(
            deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
        );
        toast.success("Bạn đã xóa sản phẩm!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
        });
    }

    // Hàm xử lý cập nhật số lượng sản phẩm
    function handleUpdateQuantity(getCartItem, typeOfAction) {
        dispatch(
            updateCartQuantity({
                userId: user?.id,
                productId: getCartItem?.productId,
                quantity:
                    typeOfAction === "plus"
                        ? getCartItem?.quantity + 1
                        : getCartItem?.quantity - 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                toast.success("Đã cập nhật giỏ hàng!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                });
            }
        });
    }

    // Hàm định dạng giá
    function formatPrice(price) {
        const priceString = price.toFixed(2); // Chuyển thành chuỗi với 2 chữ số thập phân
        return priceString.endsWith(".00") ? priceString.slice(0, -3) : priceString; // Bỏ ".00" nếu có
    }

    // Tính giá sản phẩm
    const itemPrice =
        (cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price) *
        cartItems?.quantity;
    const displayPrice = formatPrice(itemPrice);

    return (
        <div className="flex flex-col items-center p-3 space-y-3 transition-shadow duration-300 bg-white rounded-lg shadow-sm sm:flex-row sm:items-start sm:space-y-0 sm:space-x-4 hover:shadow-md">
            {/* Hình ảnh sản phẩm */}
            <img
                src={cartItems?.image}
                alt={cartItems?.title}
                className="object-cover w-20 h-20 rounded-md sm:w-24 sm:h-24"
            />

            {/* Tiêu đề và điều chỉnh số lượng */}
            <div className="flex-1 text-center sm:text-left">
                <div className="h-[3rem] sm:h-[3.375rem] overflow-hidden">
                    <h3 className="text-base font-bold text-gray-800 sm:text-lg line-clamp-2">
                        {cartItems?.title}
                    </h3>
                </div>
                <div className="flex items-center justify-center gap-2 mt-1 sm:justify-start">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={cartItems?.quantity === 1}
                        onClick={() => handleUpdateQuantity(cartItems, "minus")}
                        className="w-8 h-8 border-gray-300 rounded-full hover:border-gray-400 focus:ring-2 focus:ring-blue-500"
                    >
                        <Minus className="w-4 h-4 text-gray-600" />
                        <span className="sr-only">Giảm số lượng</span>
                    </Button>

                    <span className="text-base font-semibold text-gray-700">
                        {cartItems?.quantity}
                    </span>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpdateQuantity(cartItems, "plus")}
                        className="w-8 h-8 border-gray-300 rounded-full hover:border-gray-400 focus:ring-2 focus:ring-blue-500"
                    >
                        <Plus className="w-4 h-4 text-gray-600" />
                        <span className="sr-only">Tăng số lượng</span>
                    </Button>
                </div>
            </div>

            {/* Giá và nút xóa */}
            <div className="flex flex-col items-center space-y-1 sm:items-end">
                <p className="text-base font-semibold text-gray-900">${displayPrice}</p>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCartItemDelete(cartItems)}
                    className="text-red-500 hover:text-red-700 focus:ring-2 focus:ring-red-500"
                >
                    <Trash className="w-4 h-4" />
                    <span className="sr-only">Xóa sản phẩm</span>
                </Button>
            </div>
        </div>
    );
}

export default UserCartItemsContent;