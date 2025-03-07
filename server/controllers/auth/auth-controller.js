const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
// register
const registerUser = async (req, res) => {
    try {
        console.log("Received data:", req.body); // Kiểm tra dữ liệu từ frontend

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Thiếu các trường bắt buộc",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            message: "Tạo tài khoản thành công!",
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi máy chủ",
        });
    }
};
// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser)
            return res.json({
                success: false,
                message: "Chưa có tài khoản, vui lòng đăng ký!",
            });

        const checkPasswordMatch = await bcrypt.compare(
            password,
            checkUser.password
        );
        if (!checkPasswordMatch)
            return res.json({
                success: false,
                message: "Sai mật khẩu, vui lòng thử lại!",
            });

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60m" }
        );

        res.cookie("token", token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "Đăng nhập thành công!",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName,
            },
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Một số lỗi đã xảy ra",
        });
    }
};

// logout
const logoutUser = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Đăng xuất thành công!'
    })
}

// auth Middleware
const authMiddleware = async (req, res, next) => {
    console.log("Cookies received:", req.cookies); // Kiểm tra cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({
        success: false,
        message: 'Unauthorised User!'
    })

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorised User!'
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };