import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";  // Thêm import
import "react-toastify/dist/ReactToastify.css";  // Import CSS của React-Toastify

const initialState = {
    userName: '',
    email: '',
    password: '',
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(event) {
        event.preventDefault(); // ⚠ Đảm bảo có dòng này đầu tiên!
    
        console.log("🚀 Sending data:", formData); // Kiểm tra dữ liệu frontend
    
        dispatch(registerUser(formData)).then((data) => {
            console.log("📩 API Response in Component:", data); // Debug dữ liệu API trả về
            
            if (data?.payload?.success) {
                toast.success(data?.payload?.message || "Đăng ký thành công!");
                navigate("/auth/login");
            } else {
                toast.error(data?.payload?.message || "Có lỗi xảy ra!");
            }
        });        
    }
    
    

    return (
        <div className="w-full max-w-md mx-auto space-x-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Tạo tài khoản mới!</h1>
                <p className="mt-2">
                    Bạn đã có tài khoản?
                    <Link to="/auth/login" className="ml-2 font-medium hover:underline text-primary">
                        Đăng nhập
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Đăng kí'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;
