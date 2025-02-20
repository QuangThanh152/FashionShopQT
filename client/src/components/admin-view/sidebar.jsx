import { BadgeDollarSign, LayoutDashboard, ShoppingBasket, ChartNetwork, ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeDollarSign />,
    },
];

function MenuItems({ setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className="flex flex-col gap-2 mt-8">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen ? setOpen(false) : null;
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xl rounded-md cursor-pointer text-muted-foreground hover:bg-muted hover:text-destructive-foregrounde hover:font-bold"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();
    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b ">
                            <SheetTitle className="flex gap-2 mt-5 mb-5">
                                <ChartNetwork size={30} />
                                <h1 className="text-2xl font-extrabold">Admin board</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="flex-col hidden w-64 p-6 border-r bg-background lg:flex">
                <div
                    onClick={() => navigate("/admin/dashboard")}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <ChartNetwork size={30} />
                    <h1 className="text-2xl font-extrabold">Admin board</h1>
                </div>

                <MenuItems />
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;
