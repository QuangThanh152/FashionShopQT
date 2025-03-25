import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ToastContainer } from "react-toastify";  // Thêm import
import "react-toastify/dist/ReactToastify.css";   // Thêm CSS cho toast

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <ToastContainer limit={2} />  {/* Đặt ở đây để dùng toàn bộ app */}
    </Provider>
  </BrowserRouter>
);
