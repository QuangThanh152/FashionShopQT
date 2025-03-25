import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

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
                onClick={() => {
                    navigate("/shop/checkout");
                    setOpenCartSheet(false);
                }}
                className="w-full mt-6"
            >
                Thanh Toán
            </Button>
        </SheetContent>
    );
}

export default UserCartWrapper;
