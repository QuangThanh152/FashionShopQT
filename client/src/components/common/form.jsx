import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
    function renderInputsByComponentType(getControlItem) {
        const value = formData[getControlItem.name] || '';

        return getControlItem.componentType === "input" ? (
            <Input
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name} // Đảm bảo ID đúng
                type={getControlItem.type}
                value={value}
                onChange={event => setFormData(prev => ({ ...prev, [getControlItem.name]: event.target.value }))}
            />
        ) : getControlItem.componentType === "select" ? (
            <Select onValueChange={(value) => setFormData(prev => ({
                ...prev,
                [getControlItem.name]: value
            }))} value={value || ''}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={getControlItem.placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {getControlItem.options?.map((optionItem) => (
                        <SelectItem key={optionItem.id} value={optionItem.id}>
                            {optionItem.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        ) : getControlItem.componentType === "textarea" ? (
            <Textarea
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name} // Đảm bảo ID đúng
                value={value}
                onChange={event => setFormData(prev => ({ ...prev, [getControlItem.name]: event.target.value }))}
            />
        ) : null;
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();  // ✅ Ngăn reload trang
            onSubmit(event);  // Gọi hàm xử lý submit
        }}  className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="block mt-4 mb-1 text-left" htmlFor={controlItem.name}>
                            {controlItem.label}
                        </Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>

            <Button type="submit" className="w-full mt-2">{buttonText || 'Submit'}</Button>
        </form>
    );
}

export default CommonForm;
