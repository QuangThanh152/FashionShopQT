import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/components/ui/Loading";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {

    const dispatch = useDispatch();
    const location = useLocation();

    // Lấy paymentId và payerId từ query parameters của URL
    const param = new URLSearchParams(location.search);
    const paymentId = param.get('paymentId');
    const payerId = param.get('PayerID');

    useEffect(() => {
        if (paymentId && payerId) {
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

            dispatch(capturePayment({
                paymentId, payerId, orderId
            })).then((data) => {
                if(data?.payload?.success) {
                    sessionStorage.removeItem('currentOrderId')
                    window.location.href = '/shop/paypal-success';
                }
            })
        }
    }, [paymentId, payerId, dispatch])
    return <Card>
        <CardHeader>
            <CardTitle>
                Đang Thanh Toán...
            </CardTitle>
        </CardHeader>
    </Card>
}

export default PaypalReturnPage;