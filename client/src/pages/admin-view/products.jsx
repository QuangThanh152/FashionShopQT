import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
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
    deleteProduct, // Giả sử có action deleteProduct trong store
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const { productList } = useSelector((state) => state.adminProducts);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch(); // Sửa lỗi typo từ dispath thành dispatch

    function onSubmit(event) {
        event.preventDefault();

        if (currentEditedId !== null) {
            dispatch(
                editProduct({
                    id: currentEditedId,
                    formData,
                })
            ).then((data) => {
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

    // Hàm xóa sản phẩm
    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                toast.success("Xóa sản phẩm thành công!");
            }
        });
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    console.log(productList, uploadedImageUrl);

    return (
        <Fragment>
            <div className="flex justify-end w-full mb-6">
                <Button
                    onClick={() => setOpenCreateProductsDialog(true)}
                    className="transition-all duration-300 transform hover:scale-105 hover:bg-green-600 bg-green-500 text-white"
                >
                    Thêm Mới Sản Phẩm
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                        <AdminProductTile
                            product={productItem}
                            key={productItem._id} // Sử dụng productItem._id để đảm bảo key duy nhất
                            setCurrentEditedId={setCurrentEditedId}
                            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                            setFormData={setFormData}
                            setUploadedImageUrl={setUploadedImageUrl} // Truyền setUploadedImageUrl vào
                            handleDelete={handleDelete} // Truyền hàm xóa
                        />
                    ))
                    : <div className="text-center text-gray-500">Không có sản phẩm nào.</div>}
            </div>

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
                        <SheetTitle className="text-2xl font-semibold text-gray-800 border-b pb-4">
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
                            className="space-y-4"
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;