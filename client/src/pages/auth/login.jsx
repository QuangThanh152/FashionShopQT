"use client"

import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/config"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/auth-slice"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaUserAlt, FaLock, FaSignInAlt, FaUserPlus, FaQuestionCircle } from "react-icons/fa"

const initialState = {
  email: "",
  password: "",
}

function AuthLogin() {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch()

  function onSubmit(event) {
    event.preventDefault()

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message || "Đăng nhập thành công!")
      } else {
        toast.error(data?.payload?.message || "Có lỗi xảy ra!")
      }
    })
  }

  const enhancedControls = loginFormControls.map((control) => {
    if (control.id === "email") {
      return { ...control, icon: <FaUserAlt className="text-gray-400 transition-colors duration-300 hover:text-indigo-500" /> }
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
            <FaSignInAlt className="w-8 h-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Đăng nhập</h1>
        <p className="mt-3 text-gray-600">Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.</p>
      </div>

      <CommonForm
        formControls={enhancedControls}
        buttonText={
          <div className="flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <FaSignInAlt className="mr-2" />
            <span>Đăng nhập</span>
          </div>
        }
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center text-sm">
          <FaQuestionCircle className="mr-1 text-blue-600 transition-colors duration-300 hover:text-blue-700" />
          <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
            Quên mật khẩu?
          </Link>
        </div>
        <div className="flex items-center text-sm">
          <FaUserPlus className="mr-1 text-blue-600 transition-colors duration-300 hover:text-blue-700" />
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-700">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AuthLogin