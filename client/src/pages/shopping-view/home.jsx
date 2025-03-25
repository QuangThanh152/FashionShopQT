import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllFilteredProducts,
    fetchProductDetails,
} from "@/store/shop/product-slice";
import ShoppingProductTile from "./product-tile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMale,
    faFemale,
    faChild,
    faGem,
    faShoePrints,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

// Thêm ảnh banner
import bannerOne from "../../assets/anhBanner-1.webp";
import bannerTwo from "../../assets/anhBanner-2.webp";
import bannerThree from "../../assets/anhBanner-3.webp";
import bannerFour from "../../assets/anhBanner-4.webp";
import bannerFive from "../../assets/anhBanner-5.webp";
import bannerSix from "../../assets/anhBanner-7.webp";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import Swal from "sweetalert2";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

const categoriesWithIcon = [
    {
        id: "men",
        label: "Men",
        icon: () => (
            <FontAwesomeIcon icon={faMale} className="w-12 h-12 text-blue-500" />
        ),
    },
    {
        id: "women",
        label: "Women",
        icon: () => (
            <FontAwesomeIcon icon={faFemale} className="w-12 h-12 text-pink-500" />
        ),
    },
    {
        id: "kids",
        label: "Kids",
        icon: () => (
            <FontAwesomeIcon icon={faChild} className="w-12 h-12 text-green-500" />
        ),
    },
    {
        id: "accessories",
        label: "Accessories",
        icon: () => (
            <FontAwesomeIcon icon={faGem} className="w-12 h-12 text-purple-500" />
        ),
    },
    {
        id: "footwear",
        label: "Footwear",
        icon: () => (
            <FontAwesomeIcon
                icon={faShoePrints}
                className="w-12 h-12 text-orange-500"
            />
        ),
    },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", color: "text-red-500" },
    { id: "adidas", label: "Adidas", color: "text-black" },
    { id: "puma", label: "Puma", color: "text-yellow-500" },
    { id: "levi", label: "Levi's", color: "text-blue-600" },
    { id: "zara", label: "Zara", color: "text-gray-700" },
    { id: "h&m", label: "H&M", color: "text-red-600" },
];

function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        bannerOne,
        bannerTwo,
        bannerThree,
        bannerFour,
        bannerFive,
        bannerSix,
    ];
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(
        (state) => state.shopProducts
    );
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [section]: [getCurrentItem.id],
        };

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId) {
        // console.log(getCurrentProductId);
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
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        dispatch(
            fetchAllFilteredProducts({
                filterParams: {},
                sortParams: "price-lowtohigh",
            })
        );
    }, [dispatch]);

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Banner Slider */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
                {/* Slider Images */}
                {slides.map((slide, index) => (
                    <picture key={slide}>
                        <source srcSet={slide} type="image/webp" />
                        <img
                            src={slide.replace(".webp", ".jpg")} // Ảnh dự phòng
                            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
                                } absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-1000`}
                            alt={`Banner ${index + 1}`}
                        />
                    </picture>
                ))}

                {/* Overlay with Text and CTA */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                    <h1 className="text-4xl font-bold sm:text-6xl">Khuyến mãi lớn</h1>
                    <p className="mt-2 text-lg sm:text-2xl">Chỉ từ 99K</p>
                    <Button
                        className="px-6 py-2 mt-6 text-white transition-all duration-300 bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                        onClick={() => {
                            const element = document.getElementById("featured-products");
                            if (element) {
                                element.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                        }}
                    >
                        Mua Ngay
                    </Button>
                </div>

                {/* Navigation Arrows */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide(
                            (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
                        )
                    }
                    className="absolute text-white transform -translate-y-1/2 bg-red-500 top-1/2 left-4 hover:bg-red-600"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
                    }
                    className="absolute text-white transform -translate-y-1/2 bg-red-500 top-1/2 right-4 hover:bg-red-600"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </Button>

                {/* Slide Indicators */}
                <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`${index === currentSlide ? "bg-white" : "bg-gray-400"
                                } w-3 h-3 rounded-full`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <section className="py-12 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-9 text-primary">
                        DANH MỤC
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                        {categoriesWithIcon.map((categoryItem) => (
                            <Card
                                onClick={() =>
                                    handleNavigateToListingPage(categoryItem, "category")
                                }
                                key={categoryItem.id}
                                className="transition-transform duration-300 cursor-pointer hover:scale-105 hover:shadow-md"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {categoryItem.icon()}
                                    <span className="mt-4 font-bold">{categoryItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="py-12 bg-gray-50">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-9 text-primary">
                        THƯƠNG HIỆU
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {brandsWithIcon.map((brandItem) => (
                            <Card
                                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                                key={brandItem.id}
                                className="transition-transform duration-300 cursor-pointer hover:scale-105 hover:shadow-md"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <span
                                        className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold ${brandItem.color} bg-gray-200`}
                                    >
                                        {brandItem.label.charAt(0)}
                                    </span>
                                    <span className="mt-4 font-bold">{brandItem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-12" id="featured-products">
                <div className="container px-4 mx-auto">
                    <h2 className="text-3xl font-bold text-center mt-7 mb-9 text-primary">
                        SẢN PHẨM ĐẶC TRƯNG
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productList && productList.length > 0
                            ? productList.map((productItem) => (
                                <ShoppingProductTile
                                    key={productItem.id}
                                    handleGetProductDetails={handleGetProductDetails}
                                    handleAddtoCart={handleAddtoCart}
                                    product={productItem}
                                />
                            ))
                            : null}
                    </div>
                </div>
            </section>

            {/* chi tiet san pham */}
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingHome;
