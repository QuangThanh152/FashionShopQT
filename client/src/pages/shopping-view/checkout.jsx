import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

function ShoppingCheckout() {
    const { cartItems } = useSelector((state) => state.shopCart);

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
                <Address />
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

                        <Button className="w-full mt-4">
                            Thanh Toán Đơn Hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;
