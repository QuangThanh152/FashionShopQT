import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
    return (
        <div className="flex flex-col">
            <div className="relative w-full overflow-hidden">
                <img 
                    src={accImg}
                    className="object-cover object-center w-full h-auto" />
            </div>

            <div className="container grid grid-cols-1 gap-8 py-8 mx-auto">
                <div className="flex flex-col p-6 border rounded-lg shadow-sm bg-background">
                    <Tabs defaultValue="orders">
                        <TabsList>
                            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
                            <TabsTrigger value="address">Địa chỉ</TabsTrigger>
                        </TabsList>

                        <TabsContent value="orders">
                            <ShoppingOrders />
                        </TabsContent>
                        <TabsContent value="address">
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}


export default ShoppingAccount;
