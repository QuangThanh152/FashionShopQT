import { DoorOpen, House, ShoppingCart, SquareMenu, UserRoundCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { 
    Sheet, 
    SheetTrigger, 
    SheetContent, 
    SheetClose, 
    SheetTitle, 
    SheetDescription 
} from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Swal from "sweetalert2";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "react-toastify";

// Component hiển thị menu trên desktop
function MenuItems() {
    return (
        <nav className="flex items-center gap-4 ml-20">
            {/* Container nav với flex để hiển thị ngang, gap-8 tạo khoảng cách giữa các mục, ml-8 tạo lề trái */}
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Link
                    key={menuItem.id}
                    to={menuItem.path}
                    className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors rounded-md hover:text-purple-500 hover:bg-gray-100"
                >
                    {menuItem.label}
                    {/* Hiển thị nhãn của mục menu (ví dụ: Home, Products) */}
                </Link>
            ))}
        </nav>
    );
}

// Component hiển thị phần bên phải header (giỏ hàng, avatar, menu thả xuống)
function HeaderRightContent({ closeSheet, isMobile }) {
    const { user } = useSelector((state) => state.auth);  // Lấy thông tin người dùng từ Redux store
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        if (isMobile) {
            // Xử lý đăng xuất trực tiếp trong chế độ mobile mà không cần xác nhận
            dispatch(logoutUser());
            toast.success("Đăng xuất thành công!");
            closeSheet?.();
            // Gọi closeSheet để đóng Sheet (nếu trong mobile)
        } else {
            // Hiển thị hộp thoại xác nhận trước khi đăng xuất trong chế độ desktop
            Swal.fire({
                title: "Bạn có chắc chắn muốn đăng xuất?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Đăng xuất",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(logoutUser());
                    toast.success("Đăng xuất thành công!");
                }
            });
        }
    };

    const handleAccountClick = () => {
        // Xử lý khi click vào "Tài khoản", điều hướng đến trang tài khoản và đóng Sheet nếu cần
        navigate("/shop/account");
        closeSheet?.();
    };

    return (
        <div className="flex items-center gap-4">
            {/* Container flex để hiển thị các phần tử (giỏ hàng và avatar) ngang, cách nhau bằng gap-4 */}
            <Button
                variant="outline"
                size="icon"
                className="transition-colors rounded-full hover:bg-gray-100"
            >
                <ShoppingCart className="w-5 h-5 text-gray-800" />
                <span className="sr-only">Giỏ Hàng</span>
                {/* Nút giỏ hàng, chỉ hiển thị icon, ẩn văn bản cho screen reader */}
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black cursor-pointer">
                        <AvatarFallback className="font-extrabold text-white bg-black">
                            {user?.userName?.charAt(0).toUpperCase() || 'U'}
                            {/* Hiển thị chữ cái đầu của tên người dùng hoặc 'U' (User) mặc định */}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                    <DropdownMenuLabel className="py-2 font-medium text-center text-gray-800">
                        {user?.userName ? `Đăng nhập với ${user.userName}` : 'Tài khoản'}
                        {/* Hiển thị tên người dùng hoặc nhãn mặc định nếu chưa đăng nhập */}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleAccountClick}
                        className="flex items-center justify-center p-2 transition-colors cursor-pointer hover:bg-gray-100"
                    >
                        <UserRoundCog className="w-4 h-4 mr-2 text-purple-600" />
                        Tài khoản
                        {/* Mục "Tài khoản" với icon, điều hướng đến trang tài khoản và đóng Sheet nếu cần */}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => {
                            handleLogout();
                            closeSheet?.();
                        }}
                        className="flex items-center justify-center p-2 transition-colors cursor-pointer hover:bg-gray-100"
                    >
                        <DoorOpen className="w-4 h-4 mr-2 text-purple-600" />
                        Đăng xuất
                        {/* Mục "Đăng xuất" với icon, xử lý đăng xuất theo chế độ mobile/desktop */}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

// Component header chính của ứng dụng
function ShoppingHeader() {
    const { user } = useSelector((state) => state.auth);
    // Lấy thông tin người dùng từ Redux store
    const dispatch = useDispatch();

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b shadow-lg">
            {/* Header cố định ở đầu trang, độ cao full width, viền dưới, bóng đổ */}
            <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 md:px-8 lg:px-12">
                {/* Container với chiều cao 16, căn giữa, lề tăng dần theo breakpoint (sm, md, lg) */}
                <Link to="/shop/home" className="flex items-center gap-2">
                    <House className="w-6 h-6 text-purple-600" />
                    <span className="font-bold text-gray-900">FashionQTHouse</span>
                    {/* Link đến trang home với logo và tên thương hiệu */}
                </Link>

                {/* Menu cho desktop, ẩn trên mobile/tablet (lg:flex) */}
                <div className="items-center justify-between flex-1 hidden lg:flex">
                    <MenuItems />
                    <HeaderRightContent closeSheet={() => {}} isMobile={false} />
                    {/* Hiển thị menu ngang và phần bên phải (giỏ hàng, avatar) trên desktop */}
                </div>

                {/* Menu cho mobile và tablet, hiển thị khi kích hoạt Sheet */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden hover:bg-gray-100 transition-colors data-[state=open]:bg-secondary"
                        >
                            <SquareMenu className="w-6 h-6 text-gray-800" />
                            <span className="sr-only">Toggle menu</span>
                            {/* Nút hamburger cho mobile/tablet, ẩn trên desktop (lg:hidden), sử dụng animation từ Tailwind */}
                        </Button>
                    </SheetTrigger>
                    <SheetContent 
                        side="left" 
                        className="w-[300px] bg-background border-r border-border data-[state=open]:animate-slide-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left"
                    >
                        <SheetTitle className="sr-only">Menu Navigation</SheetTitle>
                        <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
                        <div className="py-4 space-y-6">
                            <nav className="flex flex-col gap-2">
                                {shoppingViewHeaderMenuItems.map((menuItem) => (
                                    <SheetClose asChild key={menuItem.id}>
                                        <Link
                                            to={menuItem.path}
                                            className="px-3 py-2 text-sm font-medium transition-colors rounded-md text-foreground hover:text-purple-500 hover:bg-muted"
                                        >
                                            {menuItem.label}
                                            {/* Hiển thị các mục menu mobile/tablet, đóng Sheet khi click nhờ SheetClose, sử dụng các biến màu từ Tailwind config */}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                            <HeaderRightContent closeSheet={() => {}} isMobile={true} />
                            {/* Hiển thị phần bên phải (giỏ hàng, avatar) trong mobile/tablet */}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default ShoppingHeader;