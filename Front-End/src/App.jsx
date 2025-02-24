import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import HomePage from "./pages/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFountPage";

function App() {
  const location = useLocation();
  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
