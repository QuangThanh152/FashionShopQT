"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "../../pages/auth/auth-styles.css"

function AuthPage() {
  const location = useLocation()
  const [isLoginPage, setIsLoginPage] = useState(true)

  useEffect(() => {
    // Xác định trang hiện tại dựa trên URL
    setIsLoginPage(location.pathname.includes("/auth/login"))
  }, [location])

  return (
    <div className="auth-main">
      <div className={`auth-container ${isLoginPage ? "b-container" : "a-container"}`}>
        <Outlet />
      </div>

      <div className={`auth-switch ${isLoginPage ? "" : "is-txr"}`}>
        <div className={`auth-switch-circle ${isLoginPage ? "" : "is-txr"}`}></div>
        <div className={`auth-switch-circle auth-switch-circle-t ${isLoginPage ? "" : "is-txr"}`}></div>

        {isLoginPage ? (
          <div className="auth-switch-container">
            <h2 className="auth-switch-title">Xin chào bạn!</h2>
            <p className="auth-switch-description">
              Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi
            </p>
            <a href="/auth/register" className="auth-switch-button auth-button">
              ĐĂNG KÝ
            </a>
          </div>
        ) : (
          <div className="auth-switch-container">
            <h2 className="auth-switch-title">Chào mừng trở lại!</h2>
            <p className="auth-switch-description">
              Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn
            </p>
            <a href="/auth/login" className="auth-switch-button auth-button">
              ĐĂNG NHẬP
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthPage

