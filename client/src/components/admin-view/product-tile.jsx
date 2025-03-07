import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
    product,
    setFormData,
    setOpenCreateProductsDialog,
    setCurrentEditedId,
    setUploadedImageUrl,
    handleDelete,
}) {
    // Tính phần trăm giảm giá nếu có salePrice
    const calculateDiscountPercentage = () => {
        if (product?.price && product?.salePrice && product.price > product.salePrice) {
            const discount = ((product.price - product.salePrice) / product.price) * 100;
            return Math.round(discount); // Làm tròn phần trăm để hiển thị
        }
        return 0; // Nếu không có giảm giá, trả về 0
    };

    const discountPercentage = calculateDiscountPercentage();
    return (
        <Card className="w-full max-w-md mx-auto overflow-hidden transition-all duration-300 transform shadow-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-102">
            <div className="relative group">
                <img
                    src={product?.image || "/placeholder.svg"}
                    alt={product?.title}
                    className="w-full h-[200px] object-cover rounded-t-xl transition-opacity duration-300 group-hover:opacity-90"
                />
                {product?.salePrice > 0 && (
                    <div className="absolute px-3 py-1 text-xs text-white bg-red-600 rounded-full top-2 left-2 animate-pulse-slow">
                        Sale
                    </div>
                )}
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100"></div>
            </div>

            <CardContent className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {product?.title || "Không có tiêu đề"}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                    {product?.description || "Không có mô tả"}
                </p>
                <div className="flex flex-col space-y-1">
                    <p className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <span className="text-gray-500">Thương hiệu:</span>
                        <span className="text-primary">{product?.brand || "Không có"}</span>
                    </p>
                    <p className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <span className="text-gray-500">Danh mục:</span>
                        <span className="text-primary">{product?.category || "Không có"}</span>
                    </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                    <span
                        className={`${product?.salePrice > 0
                                ? "line-through text-gray-400 text-lg"
                                : "text-lg font-bold text-gray-900"
                            }`}
                    >
                        ${product?.price}
                    </span>
                    {product?.salePrice > 0 && (
                        <span className="text-lg font-bold text-red-600 animate-pulse-fast">
                            ${product?.salePrice}
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-2 p-4 bg-gray-50">
                <Button
                    onClick={() => {
                        setOpenCreateProductsDialog(true);
                        setCurrentEditedId(product?._id?.toString() || "");
                        setFormData(product);
                        setUploadedImageUrl(product?.image || "");
                    }}
                    className="w-full font-medium text-white transition-all duration-200 transform bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                    Sửa
                </Button>
                <Button
                    onClick={() => handleDelete(product?._id?.toString() || "")}
                    className="w-full font-medium text-white transition-all duration-200 transform bg-red-600 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                    Xóa
                </Button>
            </CardFooter>
        </Card>
    );
}

export default AdminProductTile;