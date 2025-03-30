import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { ShoppingCart } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  // Fallback image nếu URL không hợp lệ
  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg"; // Hình ảnh thay thế khi tải lỗi
  };

  // tính % giảm giá
  const discount =
    product?.salePrice > 0
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : 0;

  return (
    <Card className="relative flex flex-col w-full h-full max-w-sm p-2 overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:-translate-y-1 hover:shadow-lg">
      {/* Hình ảnh sản phẩm với hiệu ứng zoom khi hover */}
      <div
        className="relative h-[220px] rounded-lg w-full overflow-hidden"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/5 to-transparent group-hover:opacity-100" />
        <img
          src={product?.image || "/placeholder.svg"}
          alt={product?.title || "Product Image"}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        {product?.totalStock === 0 ? (
          <Badge className="absolute left-3 top-3 bg-rose-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-rose-600">
            Hết hàng
          </Badge>
        ) : product?.totalStock < 5 ? (
          <Badge className="absolute left-3 top-3 bg-rose-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-rose-600">
            {`${product?.totalStock} sản phẩm cuối`}
          </Badge>
        ) : (
          discount > 0 && (
            <Badge className="absolute left-3 top-3 bg-rose-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-rose-600">
            -{discount}%
            </Badge>
          )
        )}
      </div>

      {/* Nội dung sản phẩm */}
      <CardContent className="flex flex-col flex-grow p-4">
        {/* Thông tin danh mục và thương hiệu */}
        <div className="flex items-center justify-between mb-2 text-xs font-medium text-gray-500">
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 transition-colors hover:bg-gray-200 hover:text-gray-700">
            {categoryOptionsMap[product?.category] || "Không xác định"}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 transition-colors hover:bg-gray-200 hover:text-gray-700">
            {brandOptionsMap[product?.brand] || "Không xác định"}
          </span>
        </div>

        {/* Tiêu đề sản phẩm */}
        <h2 className="mb-3 min-h-[48px] line-clamp-2 text-base font-bold text-gray-900 group-hover:text-primary">
          {product?.title || "Không có tiêu đề"}
        </h2>

        {/* Giá sản phẩm */}
        <div className="flex items-center gap-2 mt-auto">
          {product?.salePrice > 0 ? (
            <>
              <span className="text-sm font-medium text-gray-500 line-through">
                ${product?.price || 0}
              </span>
              <span className="text-lg font-bold text-rose-600">
                ${product?.salePrice || 0}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${product?.price || 0}
            </span>
          )}
        </div>
      </CardContent>

      {/* Nút thêm vào giỏ hàng */}
      <CardFooter className="p-4 bg-gray-50">
        {/* xử lý nếu sản phẩm hết hàng*/}
        {product?.totalStock <= 0 ? (
          <Button className="w-full cursor-not-allowed opacity-60">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Hết hàng
          </Button>
        ) : (
          <Button
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800"
            onClick={() => {
              handleAddtoCart(product?._id);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Thêm vào giỏ hàng
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
