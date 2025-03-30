import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
    fetchAllFilteredProducts,
    fetchProductDetails,
} from "@/store/shop/product-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductTile from "./product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import Swal from "sweetalert2";

function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
        if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }

    return queryParams.join("&");
}

function ShoppingListing() {
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(
        (state) => state.shopProducts
    );
    const { user } = useSelector((state) => state.auth);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const categorySearchParam = searchParams.get('category')

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getSectionId, getCurrentOption) {
        // console.log(getSectionId, getCurrentOption);

        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption =
                cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1) {
                cpyFilters[getSectionId].push(getCurrentOption);
            } else {
                cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
            }
        }
        // console.log(cpyFilters);
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }
    function handleAddtoCart(getCurrentProductId) {
        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));

                // Hiển thị Toast thông báo ở góc dưới
                // if (window.innerWidth >= 700 ) {
                //   toast.success("Thêm vào giỏ hàng thành công", {
                //     position: "bottom-right",
                //     autoClose: 1000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //   });
                // }

                // Nếu là mobile thì hiển thị Swal

                Swal.fire({
                    title: "Thành công!",
                    text: "Sản phẩm đã được thêm vào giỏ hàng.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                    timer: 1000, // Tự động đóng sau 1.5 giây
                    showConfirmButton: false,
                });
            }
        });
    }

    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
    }, [categorySearchParam]);

    useEffect(() => {
        if (filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParams(new URLSearchParams(createQueryString));
        }
    }, [filters]);

    // fetch list of products
    useEffect(() => {
        if (filters !== null && sort !== null)
            dispatch(
                fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
            );
    }, [dispatch, sort, filters]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    // console.log(filters, "filters")
    console.log(productList, "productList");
    // console.log(productDetails, "productDetails");

    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            {/* danh sach san pham */}
            <div className="w-full rounded-lg shadow-sm bg-background">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-extrabold ">Danh sách sản phẩm</h2>
                    <div className="flex items-center gap-3">
                        <span className="ml-2 text-gray-600">
                            {productList?.length} Sản Phẩm
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <ArrowUpDownIcon className="w-4 h-4" />
                                    <span>Sắp xếp</span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            value={sortItem.id}
                                            key={sortItem.id}
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3">
                    {productList && productList.length > 0 ? (
                        productList.map((productItem) => (
                            <ShoppingProductTile
                                product={productItem}
                                key={productItem.id}
                                handleGetProductDetails={handleGetProductDetails}
                                handleAddtoCart={handleAddtoCart}
                            />
                        ))
                    ) : (
                        <p>Không tìm thấy sản phẩm</p>
                    )}
                </div>
            </div>

            {/* chi tiet san pham */}
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingListing;
