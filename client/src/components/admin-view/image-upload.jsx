import { Input } from "postcss";
import { Label } from "../ui/label";


function ProductImageUpload() {
    return ( 
        <div className="w-full max-w-md mx-auto">
            <Label className="block mb-2 text-lg font-semibold">Upload Ảnh</Label>
            <div>
                <Input id="image-upload" type="file"  className="hidden" />
            </div>
        </div>
     );
}

export default ProductImageUpload;