"use client"

import CommonForm from "@/components/common/form"
import { registerFormControls } from "@/config"
import { registerUser } from "@/store/auth-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaUserAlt, FaEnvelope, FaLock, FaUserPlus, FaSignInAlt, FaShieldAlt } from "react-icons/fa"

const initialState = {
    userName: "",
    email: "",
    password: "",
}

function AuthRegister() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault()

        console.log("🚀 Sending data:", formData)

        dispatch(registerUser(formData)).then((data) => {
            console.log("📩 API Response in Component:", data)

            if (data?.payload?.success) {
                toast.success(data?.payload?.message || "Đăng ký thành công!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false
                })
                navigate("/auth/login")
            } else {
                toast.error(data?.payload?.message || "Có lỗi xảy ra!", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false
                })
            }
        })
    }

    const enhancedControls = registerFormControls.map((control) => {
        if (control.id === "userName") {
            return { ...control, icon: <FaUserAlt className="text-gray-400 transition-colors duration-300 hover:text-indigo-500" /> }
        } else if (control.id === "email") {
            return { ...control, icon: <FaEnvelope className="text-gray-400 transition-colors duration-300 hover:text-indigo-500" /> }
        } else if (control.id === "password") {
            return { ...control, icon: <FaLock className="text-gray-400 transition-colors duration-300 hover:text-indigo-500" /> }
        }
        return control
    })

    return (
        <div className="w-full mx-auto">
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 transition-transform duration-300 bg-indigo-100 rounded-full hover:scale-110">
                        <FaUserPlus className="w-8 h-8 text-indigo-600" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Tạo tài khoản mới</h1>
                <p className="mt-3 text-gray-600">Đăng ký để trải nghiệm mua sắm tuyệt vời cùng ShopQTFashion</p>
            </div>

            <CommonForm
                formControls={enhancedControls}
                buttonText={
                    <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
                        <FaUserPlus className="mr-2" />
                        <span>Đăng ký</span>
                    </div>
                }
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />

            <div className="flex items-center justify-center mt-6 text-sm text-center">
                <FaSignInAlt className="mr-1 text-blue-600 transition-colors duration-300 hover:text-blue-700" />
                <span className="text-gray-500">Đã có tài khoản? </span>
                <Link to="/auth/login" className="ml-1 font-medium text-blue-600 hover:text-blue-700">
                    Đăng nhập ngay
                </Link>
            </div>

            <div className="flex items-center justify-center mt-6 text-xs text-center text-gray-500">
                <FaShieldAlt className="mr-1 text-gray-400 transition-colors duration-300 hover:text-gray-600" />
                <span>
                    Bằng việc đăng ký, bạn đồng ý với
                    <a href="#" className="text-blue-600 hover:underline">
                        {" "}Điều khoản dịch vụ{" "}
                    </a>
                    và
                    <a href="#" className="text-blue-600 hover:underline">
                        {" "}Chính sách bảo mật{" "}
                    </a>
                    của chúng tôi.
                </span>
            </div>
        </div>
    )
}

export default AuthRegister