import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { toast } from "react-toastify";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
    const navigate = useNavigate();
    // tổng giá trị đơn hàng trong giỏ hàng
    const totalCartAmount =
        // kiểm tra có sản phẩm trong giỏ hàng không  cartItems && cartItems.length -> tính tổng
        cartItems && cartItems.length > 0
            ? cartItems.reduce(
                (sum, currentItem) =>
                    sum +
                    (currentItem?.salePrice > 0
                        ? currentItem?.salePrice
                        : currentItem?.price) *
                    currentItem?.quantity,
                0
            )
            : 0;

    // Kiểm tra giỏ hàng có sản phẩm không
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.error("Chưa có sản phẩm để thanh toán!", {
                position: "top-center",
                autoClose: 1000,
                closeOnClick: true,
                hideProgressBar: true,
                pauseOnHover: false,
            });
            return; // Chặn chuyển hướng nếu giỏ hàng trống
        }

        // Nếu có sản phẩm, chuyển đến trang thanh toán
        navigate("/shop/checkout");
        setOpenCartSheet(false);
    };
    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle className="font-bold">Giỏ hàng</SheetTitle>
            </SheetHeader>

            <div className="mt-8 space-y-4 max-h-[75vh] overflow-y-auto">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <UserCartItemsContent key={item.productId} cartItems={item} />
                    ))
                ) : (
                    <p>Giỏ hàng trống</p>
                )}
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-bold">Tổng</span>
                    <span className="font-bold">$ {totalCartAmount}</span>
                </div>
            </div>

            <Button
                onClick={handleCheckout}
                className="w-full mt-6"
            >
                Thanh Toán
            </Button>
        </SheetContent>
    );
}

export default UserCartWrapper;
