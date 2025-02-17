import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";  // Thêm import
import "react-toastify/dist/ReactToastify.css";  // Import CSS của React-Toastify

const initialState = {
    email: '',
    password: '',

};
function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();


    function onSubmit(event) {
        event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Đăng nhập thành công!");
      } else {
        toast.error(data?.payload?.message || "Có lỗi xảy ra!");
      }
    });
    }

    return (<div className="w-full max-w-md mx-auto space-x-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Đăng nhập với tài khoản của bạn</h1>
            <p className="mt-2">Chưa có tài khoản?
                <Link to="/auth/register" className="ml-2 font-medium hover:underline text-primary">Đăng kí</Link>
            </p>
        </div>
        <CommonForm
        formControls={loginFormControls}
        buttonText={'Đăng nhập'} 
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        />
    </div>);
}

export default AuthLogin;