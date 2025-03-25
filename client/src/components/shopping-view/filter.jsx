import { filterOptions } from "@/config";
import { Fragment, useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button"; // Nút toggle mở filter
import { X } from "lucide-react"; // Icon đóng

function ProductFilter({ filters, handleFilter }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Nút mở filter trên mobile */}
            <Button
                className="block w-full py-2 font-bold text-white bg-blue-600 rounded-md md:hidden"
                onClick={() => setIsOpen(true)}
            >
                Lọc sản phẩm
            </Button>

            {/* Sidebar bộ lọc */}
            <div
                className={`fixed top-0 left-0 h-full w-4/5 sm:w-1/2 max-w-xs bg-white shadow-lg transition-transform duration-300 z-50 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:static md:w-full md:max-w-none md:translate-x-0 md:z-auto md:bg-transparent md:shadow-none`}
            >
                {/* Header Sidebar (Mobile) */}
                <div className="flex items-center justify-between p-4 border-b md:hidden">
                    <h2 className="text-lg font-bold">Lọc sản phẩm</h2>
                    <Button className="text-gray-600" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </Button>
                </div>

                {/* Nội dung bộ lọc */}
                <div className="p-5 rounded-lg shadow bg-white md:shadow-none md:p-0 
                max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-visible">

                    <h2 className="hidden text-lg font-extrabold md:block">Lọc sản phẩm</h2>

                    <div className="pt-4 space-y-4">
                        {Object.keys(filterOptions).map((keyItem) => (
                            <Fragment key={keyItem}>
                                <div>
                                    <h3 className="text-base font-bold">{keyItem}</h3>
                                    <div className="grid gap-2 mt-2">
                                        {filterOptions[keyItem].map((option, index) => (
                                            <Label
                                                key={index}
                                                className="flex items-center gap-2 font-medium"
                                            >
                                                <Checkbox
                                                    checked={
                                                        filters &&
                                                        Object.keys(filters).length > 0 &&
                                                        filters[keyItem] &&
                                                        filters[keyItem].indexOf(option.id) > -1
                                                    }
                                                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                                                />
                                                {option.label}
                                            </Label>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay (Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default ProductFilter;
