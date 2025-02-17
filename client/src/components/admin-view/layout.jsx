import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";

function AdminLayout() {
    return ( 
    <div>
        <div className="flex w-full min-h-screen">
            {/* admin sidebar */}
            <AdminSideBar />
            <div className="flex flex-col flex-1">
                {/* admin header */}
                <AdminHeader />
                <main className="flex flex-1 p-4 bg-muted/40 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    </div>
    );
}

export default AdminLayout;