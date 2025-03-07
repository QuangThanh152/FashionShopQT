import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
    addNewProduct,
    editProduct,
    fetchAllProducts,
    deleteProduct,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Khởi tạo dữ liệu form ban đầu cho sản phẩm
const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
};

function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false); // State để kiểm soát việc mở/đóng dialog thêm/sửa sản phẩm, ban đầu là false (đóng)
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { productList } = useSelector((state) => state.adminProducts);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch(); // Hook useDispatch để gửi các action Redux

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang (4 cột x 2 hàng)

    function onSubmit(event) {
        event.preventDefault();

        if (currentEditedId !== null) {
            dispatch(
                editProduct({
                    id: currentEditedId.toString(), // Đảm bảo ID là chuỗi để gửi lên API
                    formData, // Dữ liệu form hiện tại để cập nhật sản phẩm
                })
            ).then((data) => {
                // Gửi action editProduct và xử lý kết quả
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setFormData(initialFormData);
                    setOpenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                    toast.success("Sửa sản phẩm thành công!");
                }
            });
        } else {
            dispatch(
                addNewProduct({
                    ...formData,
                    image: uploadedImageUrl,
                })
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setOpenCreateProductsDialog(false);
                    setImageFile(null);
                    setFormData(initialFormData);
                    toast.success("Thêm sản phẩm thành công!");
                }
            });
        }
    }

    // xử lý xóa sản phẩm
    const handleDelete = (productId) => {
        // Hiển thị hộp thoại xác nhận trước khi xóa sản phẩm
        Swal.fire({
            title: "Bạn chắc chắn?",
            text: "Bạn muốn xóa sản phẩm này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6", // Màu xanh cho nút OK
            cancelButtonColor: "#d33", // Màu đỏ cho nút Hủy
            confirmButtonText: "OK",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                // Nếu người dùng chọn "OK", tiến hành xóa sản phẩm
                dispatch(deleteProduct(productId)).then((data) => {
                    if (data?.payload?.success) {
                        // Nếu API trả về thành công
                        dispatch(fetchAllProducts()); // Cập nhật lại danh sách sản phẩm từ API
                        toast.success("Xóa sản phẩm thành công!"); // Hiển thị thông báo thành công
                        Swal.fire({
                            title: "Xóa thành công!",
                            text: "Sản phẩm đã bị xóa.",
                            icon: "success",
                            confirmButtonText: "Đóng",
                        });
                    }
                });
            }
        });
    };

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key] !== "")
            .every((item) =>item);
    }
    useEffect(() => {
        dispatch(fetchAllProducts({ page: 1, limit: 0 }));
    }, [dispatch]);

    // Phân trang
    const totalItems = productList.length; // Tổng số sản phẩm trong danh sách productList

    const totalPages = Math.ceil(totalItems / itemsPerPage); 
    const startIndex = (currentPage - 1) * itemsPerPage; // Chỉ số bắt đầu của danh sách sản phẩm trên trang hiện tại (ví dụ: trang 1 => startIndex = 0)
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = productList.slice(startIndex, endIndex); // Lấy danh sách sản phẩm cho trang hiện tại bằng cách cắt productList từ startIndex đến endIndex

    return (
        <Fragment>
            <div className="flex justify-end w-full mb-6">
                <Button
                    // Khi click, mở dialog thêm sản phẩm
                    onClick={() => setOpenCreateProductsDialog(true)}
                    className="text-white transition-all duration-300 transform bg-green-500 rounded-lg hover:scale-105 hover:bg-green-600"
                >
                    Thêm Mới Sản Phẩm
                </Button>
            </div>

            {/* Hiển thị sản phẩm qua phân trang */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productList && productList.length > 0
                    ? paginatedProducts.map((productItem) => (
                        <AdminProductTile
                            product={productItem}
                            key={productItem._id}
                            setCurrentEditedId={setCurrentEditedId}
                            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                            setFormData={setFormData}
                            setUploadedImageUrl={setUploadedImageUrl}
                            handleDelete={handleDelete}
                        />
                    ))
                    : <div className="text-center text-gray-500">Không có sản phẩm nào.</div>}
            </div>

            {/* Phân trang */}
            {totalItems > itemsPerPage && (
                // Hiển thị phân trang nếu có hơn 8 sản phẩm
                <div className="flex items-center justify-center gap-2 mt-6">
                    <Button
                        // Chuyển đến trang trước, không nhỏ hơn 1
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        // Vô hiệu hóa nút nếu đang ở trang 1
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        Trước
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <Button
                            key={i + 1}
                            // Chuyển đến trang tương ứng khi click
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-lg ${
                                currentPage === i + 1
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            } transition-colors`}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        // Chuyển đến trang tiếp theo, không lớn hơn tổng số trang
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}

                        // vô hiệu hóa nếu đang ở trang cuối cùng
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        Tiếp
                    </Button>
                </div>
            )}

            <Sheet
                open={openCreateProductsDialog}
                onOpenChange={() => {
                    setOpenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                    setFormData(initialFormData);
                }}
            >
                <SheetContent side="right" className="w-[400px] overflow-auto bg-white shadow-2xl rounded-l-lg">
                    <SheetHeader>
                        <SheetTitle className="pb-4 text-2xl font-semibold text-gray-800 border-b">
                            {currentEditedId !== null ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
                        </SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        imageLoadingState={imageLoadingState}
                        setImageLoadingState={setImageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />

                    <div className="py-6">
                        <CommonForm
                            onSubmit={onSubmit}
                            formData={formData}
                            setFormData={setFormData}
                            buttonText={currentEditedId !== null ? "Sửa" : "Thêm"}
                            formControls={addProductFormElements}
                            isBtnDisabled={!isFormValid()}
                            className="space-y-4"
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;