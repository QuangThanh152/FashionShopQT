import { useEffect } from "react";
import ShoppingOrders from "@/components/shopping-view/orders";
import Swal from "sweetalert2";

function PaymentSuccessPage() {
    useEffect(() => {
        Swal.fire({
            width: 500,
            padding: "3em",
            icon: "success",
            backdrop: `
                    rgba(0,0,123,0.4)
                    url("/nyan-cat.gif")
                    left top
                    no-repeat
            `,
            text: "Đơn hàng của bạn đã được thanh toán!",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
        });
    }, []);

    return (
        <div>
            <ShoppingOrders />
        </div>
    );
}

export default PaymentSuccessPage;
