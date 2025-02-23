import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: "",
    salePrice: '',
    totalStock: '',
}


function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);

    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [ imageLoadingState, setImageLoadingState ] = useState(false);


    function onSubmit() {

    }

    return (
        <Fragment>
            <div className="flex justify-end w-full mb-5">
                <Button onClick={() => setOpenCreateProductsDialog(true)} className="transition-all duration-300 transform hover:scale-110 hover:bg-red-500">
                    Thêm Mới Sản Phẩm
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

            <Sheet open={openCreateProductsDialog} onOpenChange={() => {
                setOpenCreateProductsDialog(false);
            }}>
                <SheetContent side='right' className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-semibold text-red-700">Thêm mới sản phẩm</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload 
                        imageFile={imageFile} 
                        setImageFile={setImageFile} 
                        uploadedImageUrl={uploadedImageUrl} 
                        setUploadedImageUrl={setUploadedImageUrl} 
                        // imageLoadingState={imageLoadingState}
                        setImageLoadingState={setImageLoadingState}
                    />

                    <div className="py-6">
                        <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText='Thêm' formControls={addProductFormElements} />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;
