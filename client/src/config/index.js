
export const registerFormControls = [
    {
        name: 'userName',
        label: 'Tên đăng nhập',
        placeholder: 'Nhập tên đăng nhập',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Nhập email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Mật khẩu',
        placeholder: 'Nhập mật khẩu',
        componentType: 'input',
        type: 'password',
    }
]


export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Nhập email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Mật khẩu',
        placeholder: 'Nhập mật khẩu',
        componentType: 'input',
        type: 'password',
    }
]

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Nhập tên sản phẩm",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Nhập mô tả sản phẩm",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Nhập giá sản phẩm",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Nhập giá bán sale (tùy chọn)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Nhập tổng số hàng",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        path: "/shop/home",
    },
    {
        id: "men",
        label: "Men",
        path: "/shop/listing",
    },
    {
        id: "women",
        label: "Women",
        path: "/shop/listing",
    },
    {
        id: "kids",
        label: "Kids",
        path: "/shop/listing",
    },
    {
        id: "footwear",
        label: "Footwear",
        path: "/shop/listing",
    },
    {
        id: "accessories",
        label: "Accessories",
        path: "/shop/listing",
    },
    {
        id: "search",
        label: "Search",
        path: "/shop/search",
    },
];

export const categoryOptionsMap = {
    men: "Men",
    women: "Women",
    kids: "Kids",
    accessories: "Accessories",
    footwear: "Footwear",
};

export const brandOptionsMap = {
    nike: "Nike",
    adidas: "Adidas",
    puma: "Puma",
    levi: "Levi",
    zara: "Zara",
    "h&m": "H&M",
};

export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],
    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "puma", label: "Puma" },
        { id: "levi", label: "Levi's" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },
    ],
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Giá: Thấp đến Cao" },
    { id: "price-hightolow", label: "Giá: Cao đến Thấp" },
    { id: "title-atoz", label: "A đến Z" },
    { id: "title-ztoa", label: "Z đến A" },
];

export const addressFormControls = [
    {
        label: "Địa chỉ",
        name: "address",
        componentType: "input",
        type: "text",
        placeholder: "Nhập địa chỉ",
    },
    {
        label: "Thành phố",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Nhập thành phố",
    },
    {
        label: "Pincode",
        name: "pincode",
        componentType: "input",
        type: "text",
        placeholder: "Nhập pincode",
    },
    {
        label: "Số điện thoại",
        name: "phone",
        componentType: "input",
        type: "text",
        placeholder: "Nhâp số điện thoại",
    },
    {
        label: "Ghi chú",
        name: "notes",
        componentType: "textarea",
        placeholder: "Nhập ghi chú",
    },
];