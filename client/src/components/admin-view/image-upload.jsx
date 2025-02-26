import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    setImageLoadingState,
    imageLoadingState,
    isEditMode,
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setImageFile(droppedFile);
        }
    }

    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append("my_file", imageFile);
        try {
            const response = await axios.post(
                "http://localhost:5000/api/admin/products/upload-image",
                data
            );
            console.log("Response from Cloudinary:", response);
            if (response?.data?.success) {
                setUploadedImageUrl(response.data.result.url);
                setImageLoadingState(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setImageLoadingState(false);
        }
    }
    useEffect(() => {
        if (imageFile !== null) uploadImageToCloudinary();
    }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <Label className="block mb-2 text-lg font-semibold ">Upload Ảnh</Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`${isEditMode ? "opacity-60" : ""
                    } border-2 border-dashed rounded-lg p-4`}
            >
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled={isEditMode}
                />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode ? "cursor-not-allowed" : ""
                            } flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className="w-10 h-10 mb-2 text-muted-foreground" />
                        <span>Vui lòng tải ảnh lên ảnh sản phẩm!</span>
                    </Label>
                ) : imageLoadingState ? (
                    <Skeleton className="h-10 bg-gray-100" />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 h-8 mr-2 text-primary" />
                        </div>

                        <p className="text-sm font-medium">{imageFile.name}</p>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Xóa File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
