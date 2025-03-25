"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from "@/store/shop/address-slice"
import { addressFormControls } from "@/config"
import CommonForm from "../common/form"
import AddressCard from "./address-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Edit, MapPin } from "lucide-react"
import { Button } from "../ui/button"

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
}

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData)
  const dispatch = useDispatch()
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const [activeTab, setActiveTab] = useState("form")

  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.shopAddress)

  function handleManageAddress(event) {
    event.preventDefault()

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData)
      toast.warn("Bạn chỉ có thể thêm tối đa 3 địa chỉ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      })
      return
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setCurrentEditedId(null)
            setFormData(initialAddressFormData)
            toast.success("Đã cập nhật địa chỉ", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            })
            setActiveTab("addresses")
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          }),
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setFormData(initialAddressFormData)
            toast.success("Đã thêm địa chỉ", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
            })
            setActiveTab("addresses")
          }
        })
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id))
        toast.success("Đã xóa địa chỉ", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        })
      }
    })
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id)
    setFormData({
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      pincode: getCuurentAddress?.pincode,
      notes: getCuurentAddress?.notes || "",
    })
    setActiveTab("form")
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "notes")
      .map((key) => formData[key].trim() !== "")
      .every((item) => item)
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id))
  }, [dispatch, user?.id])

  return (
    <Card className="border shadow-lg rounded-xl">
      <CardHeader className="pb-3 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardTitle className="text-base font-bold truncate xs:text-lg sm:text-xl md:text-2xl text-primary">
          Quản lý địa chỉ
        </CardTitle>
        <CardDescription className="text-sm truncate xs:text-base sm:text-lg">
          Quản lý địa chỉ giao hàng của bạn
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid w-full grid-cols-2 gap-2">
            <TabsTrigger value="form" className="flex items-center gap-2 text-sm font-medium truncate xs:text-base sm:text-lg">
              {currentEditedId !== null ? (
                <>
                  <Edit className="w-5 h-5" /> Chỉnh sửa địa chỉ
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" /> Thêm địa chỉ mới
                </>
              )}
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2 text-sm font-medium truncate xs:text-base sm:text-lg">
              <MapPin className="w-5 h-5" /> Địa chỉ của tôi{" "}
              {addressList?.length > 0 && (
                <span className="px-2 py-0.5 text-sm bg-primary/20 rounded-full">{addressList.length}</span>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="form" className="mt-0">
          <CardContent className="p-6">
            <Card className="border rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-base font-semibold truncate xs:text-lg sm:text-xl text-primary">
                  {currentEditedId !== null ? "Chỉnh sửa địa chỉ" : "Thêm mới địa chỉ"}
                </CardTitle>
                {addressList.length >= 3 && currentEditedId === null && (
                  <CardDescription className="text-sm font-medium text-red-500 truncate">
                    Bạn đã đạt đến giới hạn 3 địa chỉ. Vui lòng xóa hoặc chỉnh sửa địa chỉ hiện có.
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={addressFormControls}
                  formData={formData}
                  setFormData={setFormData}
                  buttonText={currentEditedId !== null ? "Lưu thay đổi" : "Thêm địa chỉ"}
                  onSubmit={handleManageAddress}
                  isBtnDisabled={!isFormValid()}
                />
              </CardContent>
            </Card>
          </CardContent>
        </TabsContent>

        <TabsContent value="addresses" className="mt-0">
          <CardContent className="p-6">
            {addressList && addressList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
                {addressList.map((singleAddressItem) => (
                  <AddressCard
                    key={singleAddressItem._id}
                    addressInfo={singleAddressItem}
                    handleDeleteAddress={handleDeleteAddress}
                    handleEditAddress={handleEditAddress}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center rounded-lg bg-gray-50">
                <MapPin className="w-16 h-16 mb-4 text-gray-400" />
                <p className="mb-4 text-lg text-gray-600">Bạn chưa có địa chỉ nào</p>
                <Button
                  onClick={() => setActiveTab("form")}
                  className="flex items-center gap-2 text-white bg-primary hover:bg-primary/90"
                >
                  <PlusCircle className="w-5 h-5" /> Thêm địa chỉ mới
                </Button>
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default Address