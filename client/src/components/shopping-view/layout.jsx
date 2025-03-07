
import ShoppingHeader from "./header";
import ShoppingListing from "@/pages/shopping-view/listing";

function ShoppingLayout() {
    return (
        <div className="flex flex-col overflow-hidden bg-white">

            {/* common header */}
            <ShoppingHeader />
            <main className="flex flex-col w-full">
                <ShoppingListing />
            </main>
        </div>
    );
}

export default ShoppingLayout;