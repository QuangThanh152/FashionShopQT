import { Outlet } from "react-router-dom"
import { FaShoppingBag, FaTshirt, FaGem, FaShieldAlt } from "react-icons/fa"

function AuthLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Phần bên trái - Branding */}
      <div className="relative items-center justify-center hidden w-1/2 px-12 overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 lg:flex">
        {/* Hiệu ứng trang trí */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-40 h-40 bg-white rounded-full top-10 left-10 opacity-10 animate-pulse"></div>
          <div className="absolute bg-white rounded-full bottom-10 right-10 w-60 h-60 opacity-10 animate-pulse"></div>
          <div className="absolute bg-white rounded-full top-1/2 left-1/4 w-80 h-80 opacity-10 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-md space-y-8 text-center">
          <div className="flex items-center justify-center mb-8">
            <FaShoppingBag className="w-16 h-16 text-white transition-transform duration-300 hover:scale-110" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-md">ShopQTFashion</h1>
          <p className="text-xl text-purple-100 drop-shadow-sm">
            Nơi phong cách gặp gỡ chất lượng, mang đến trải nghiệm mua sắm tuyệt vời nhất cho bạn.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-white rounded-full bg-opacity-20 hover:scale-110">
                <FaTshirt className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Thời trang</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-white rounded-full bg-opacity-20 hover:scale-110">
                <FaGem className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Chất lượng</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 bg-white rounded-full bg-opacity-20 hover:scale-110">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">Bảo đảm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phần bên phải - Form đăng nhập/đăng ký */}
      <div className="flex items-center justify-center flex-1 px-4 py-12 bg-white sm:px-6 lg:px-8">
        <div className="w-full max-w-md p-8 mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout