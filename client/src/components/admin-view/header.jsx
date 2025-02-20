import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({setOpen}) {
    return ( 
        <header className="flex items-center justify-between px-4 py-3 border-b bg-background">
            <Button onClick={() =>setOpen(true)} className="lg:hidden sm:block">
                <AlignJustify />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex justify-end flex-1">
                <Button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md shadow">
                    <LogOut />
                    Đăng xuất
                </Button>
            </div>
        </header>   
     );
}

export default AdminHeader;