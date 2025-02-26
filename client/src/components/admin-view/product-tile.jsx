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
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102">
      <div className="relative group">
        <img
          src={product?.image || "/placeholder.svg"}
          alt={product?.title}
          className="w-full h-[200px] object-cover rounded-t-xl transition-opacity duration-300 group-hover:opacity-90"
        />
        {product?.salePrice > 0 && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse-slow">
            Sale
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-900 truncate">
          {product?.title || "Không có tiêu đề"}
        </h2>
        <p className="text-sm text-gray-600 truncate">
          {product?.description || "Không có mô tả"}
        </p>
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <span className="text-gray-500">Thương hiệu:</span>
            <span className="text-primary">{product?.brand || "Không có"}</span>
          </p>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <span className="text-gray-500">Danh mục:</span>
            <span className="text-primary">{product?.category || "Không có"}</span>
          </p>
        </div>
        <div className="flex justify-between items-center pt-1">
          <span
            className={`${
              product?.salePrice > 0
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

      <CardFooter className="p-4 bg-gray-50 flex justify-between items-center gap-2">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id?.toString() || "");
            setFormData(product);
            setUploadedImageUrl(product?.image || "");
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-lg"
        >
          Sửa
        </Button>
        <Button
          onClick={() => handleDelete(product?._id?.toString() || "")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 rounded-lg"
        >
          Xóa
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;