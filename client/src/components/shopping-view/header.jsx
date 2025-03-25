import {
    DoorOpen,
    House,
    ShoppingCart,
    SquareMenu,
    UserRoundCog,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
    SheetTitle,
    SheetDescription,
} from "../ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Swal from "sweetalert2";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "react-toastify";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

// Component hiển thị menu trên desktop
function MenuItems({ handleNavigateToListingPage }) { // Nhận hàm qua props
    return (
        <nav className="flex items-center gap-4 ml-20">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                    key={menuItem.id}
                    onClick={() => handleNavigateToListingPage(menuItem)}
                    className="px-3 py-1 text-sm font-medium text-gray-700 transition-colors rounded-md cursor-pointer hover:text-purple-500 hover:bg-gray-100"
                >
                    {menuItem.label}
                </Label>
            ))}
        </nav>
    );
}

// Component hiển thị phần bên phải header (giỏ hàng, avatar, menu thả xuống)
function HeaderRightContent({ closeSheet, isMobile }) {
    const { user } = useSelector((state) => state.auth);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const { cartItems } = useSelector((state) => state.shopCart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        if (isMobile) {
            dispatch(logoutUser());
            toast.success("Đăng xuất thành công!");
            closeSheet?.();
        } else {
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

    useEffect(() => {
        dispatch(fetchCartItems(user?.id));
    }, [dispatch]);

    const handleAccountClick = () => {
        navigate("/shop/account");
        closeSheet?.();
    };

    return (
        <div className="flex items-center gap-4">
            <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
                <Button
                    onClick={() => setOpenCartSheet(true)}
                    variant="outline"
                    size="icon"
                    className="transition-colors rounded-full hover:bg-gray-100"
                >
                    <ShoppingCart className="w-5 h-5 text-gray-800" />
                    <span className="sr-only">Giỏ Hàng</span>
                </Button>
                <UserCartWrapper
                    setOpenCartSheet={setOpenCartSheet}
                    cartItems={
                        cartItems && cartItems.items && cartItems.items.length > 0
                            ? cartItems.items
                            : []
                    }
                />
            </Sheet>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="bg-black cursor-pointer">
                        <AvatarFallback className="font-extrabold text-white bg-black">
                            {user?.userName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    className="w-56 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                    <DropdownMenuLabel className="py-2 font-medium text-center text-gray-800">
                        {user?.userName ? `Đăng nhập với ${user.userName}` : "Tài khoản"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleAccountClick}
                        className="flex items-center justify-center p-2 transition-colors cursor-pointer hover:bg-gray-100"
                    >
                        <UserRoundCog className="w-4 h-4 mr-2 text-purple-600" />
                        Tài khoản
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
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

// Component header chính của ứng dụng
function ShoppingHeader() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Định nghĩa hàm handleNavigateToListingPage trong ShoppingHeader
    function handleNavigateToListingPage(getCurrentMenuItem) {
        sessionStorage.removeItem('filters');
        const currentFilter =
            getCurrentMenuItem.id !== 'home'
                ? { category: [getCurrentMenuItem.id] }
                : null;
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate(getCurrentMenuItem.path);
    }

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b shadow-lg">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 md:px-8 lg:px-12">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <House className="w-6 h-6 text-purple-600" />
                    <span className="font-bold text-gray-900">FashionQTHouse</span>
                </Link>

                <div className="items-center justify-between flex-1 hidden lg:flex">
                    <MenuItems handleNavigateToListingPage={handleNavigateToListingPage} />
                    <HeaderRightContent closeSheet={() => {}} isMobile={false} />
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="lg:hidden hover:bg-gray-100 transition-colors data-[state=open]:bg-secondary"
                        >
                            <SquareMenu className="w-6 h-6 text-gray-800" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="w-[300px] bg-background border-r border-border data-[state=open]:animate-slide-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left"
                    >
                        <SheetTitle className="sr-only">Menu Navigation</SheetTitle>
                        <SheetDescription className="sr-only">
                            Mobile navigation menu
                        </SheetDescription>
                        <div className="py-4 space-y-6">
                            <nav className="flex flex-col gap-2">
                                {shoppingViewHeaderMenuItems.map((menuItem) => (
                                    <SheetClose asChild key={menuItem.id}>
                                        <div
                                            onClick={() => handleNavigateToListingPage(menuItem)}
                                            className="px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer text-foreground hover:text-purple-500 hover:bg-muted"
                                        >
                                            {menuItem.label}
                                        </div>
                                    </SheetClose>
                                ))}
                            </nav>
                            <HeaderRightContent closeSheet={() => {}} isMobile={true} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default ShoppingHeader;