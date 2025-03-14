import { ShoppingCart, X, Tag, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const discount =
    productDetails?.salePrice > 0
      ? Math.round(
        ((productDetails.price - productDetails.salePrice) /
          productDetails.price) *
        100
      )
      : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-y-auto p-0 sm:max-w-[80vw] lg:max-w-[70vw]">
        {/* Nút đóng */}
        <DialogClose asChild>
          <button className="absolute z-10 p-2 transition-colors rounded-full right-4 top-4 bg-white/90 backdrop-blur-sm hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </DialogClose>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
          {/* Phần hình ảnh */}
          <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="relative h-full p-6 overflow-hidden">
    <img
      src={productDetails?.image || "/placeholder.svg"}
      alt={productDetails?.title}
      className="w-full h-full object-cover max-h-[80vh] transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg"
    />
    {discount > 0 && (
      <Badge className="absolute top-4 right-4 bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md">
        -{discount}%
      </Badge>
    )}
  </div>
</div>
          {/* Phần thông tin */}
          <div className="flex flex-col p-8 space-y-4 md:p-10 md:space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {productDetails?.category && (
                <Badge
                  variant="outline"
                  className="px-2 py-0.5 border-primary/30 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {productDetails.category}
                </Badge>
              )}
              {productDetails?.brand && (
                <Badge
                  variant="outline"
                  className="px-2 py-0.5 border-primary/30 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  {productDetails.brand}
                </Badge>
              )}
            </div>

            <div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {productDetails?.title}
              </h1>
            </div>

            <Separator className="my-4" />

            <div className="prose text-gray-700 prose-gray max-w-none">
              <p className="text-base leading-relaxed">
                {productDetails?.description}
              </p>
            </div>

            {/* Giá, tiết kiệm và Chất lượng sản phẩm */}
            <div className="flex items-center gap-4">
              {/* Giá và tiết kiệm */}
              <div className="flex items-baseline gap-3">
                {productDetails?.salePrice > 0 ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      ${productDetails.salePrice}
                    </span>
                    <span className="text-xl font-medium text-gray-500 line-through">
                      ${productDetails.price}
                    </span>
                    <Badge className="ml-2 text-yellow-800 bg-yellow-100 hover:bg-yellow-100 hover:text-yellow-800">
                      Tiết kiệm $
                      {(productDetails.price - productDetails.salePrice).toFixed(2)}
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ${productDetails?.price}
                  </span>
                )}
              </div>

              {/* Chất lượng sản phẩm */}
              {/* <div className="flex flex-col items-center gap-2 md:flex-row">
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                  <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                  <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                  <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                  <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                </div>
                <span className="text-muted-foreground">(4.8)</span>
              </div> */}
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <div className="mt-4">
              <Button
                size="lg"
                className="w-full font-medium text-white transition-all duration-300 bg-gray-900 hover:bg-gray-700 hover:shadow-lg hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
            </div>

            {/* Phần đánh giá */}
            <Separator />
            <div className="max-h-[300px] overflow-auto p-4 bg-gray-50 rounded-lg">
              <h2 className="mb-4 text-xl font-bold">Đánh giá</h2>
              <div className="grid gap-6">
                {/* Thứ tự đánh giá trong scroll */}
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>QT</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Ho Quang Thanh</h3>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                      <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                      <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                      <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                      <StarIcon className="w-5 h-5 fill-red-500 stroke-red-500" />
                    </div>
                    <p className="text-muted-foreground">
                      Sản phẩm rất đẹp và đáng mua
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 flex ga[-2">
              <Input placeholder="Viết đánh giá..." />
              <Button>Đăng</Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;