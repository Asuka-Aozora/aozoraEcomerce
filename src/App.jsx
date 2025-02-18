import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import Homepage from "./pages/Homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFountPage";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
