"use client"

import { MapPin, Phone, Tag, FileText, Building2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "../ui/label"

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId }) {
    return (
        <Card
            className={`relative overflow-hidden transition-all duration-300 border-2 shadow-sm hover:shadow-md group
                ${selectedId?._id === addressInfo?._id
                    ? "border-primary ring-2 ring-primary/30 shadow-md"
                    : "border-gray-200 hover:border-primary/50"
                }
                ${setCurrentSelectedAddress ? "cursor-pointer" : ""}
            `}
            onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}
        >
            {/* Selected indicator */}
            {selectedId?._id === addressInfo?._id && (
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-primary">
                    <MapPin className="absolute top-[-30px] right-[-35px] w-4 h-4 text-white" />
                </div>
            )}

            <div
                className={`absolute inset-0 border-2 border-transparent transition-all duration-300 pointer-events-none
                ${selectedId?._id === addressInfo?._id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-hover:border-primary/20"
                    }
            `}
            ></div>

            <CardContent className="p-0">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-primary">Địa chỉ giao hàng</h3>
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                        {addressInfo?.address}, {addressInfo?.city}
                    </Badge>
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                        <Label className="text-base font-medium">Address: {addressInfo?.address}</Label>
                    </div>

                    <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-primary shrink-0" />
                        <Label className="text-base font-medium">City: {addressInfo?.city}</Label>
                    </div>

                    <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-primary shrink-0" />
                        <Label className="text-base font-medium">Pincode: {addressInfo?.pincode}</Label>
                    </div>

                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary shrink-0" />
                        <Label className="text-base font-medium">Phone: {addressInfo?.phone}</Label>
                    </div>

                    <>
                        <Separator className="my-2" />
                        <div className="flex items-start gap-3">
                            <FileText className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                            <Label className="text-sm font-normal text-muted-foreground">
                                Notes: {addressInfo?.notes?.trim() ? addressInfo.notes : "Không có ghi chú!"}
                            </Label>
                        </div>
                    </>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between gap-2 p-4 pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-blue-700 bg-blue-100 hover:bg-blue-200"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleEditAddress(addressInfo)
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    className="w-full text-red-700 bg-red-100 hover:bg-red-200"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAddress(addressInfo)
                    }}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard

