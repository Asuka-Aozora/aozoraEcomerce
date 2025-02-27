import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "../components/ui/skeleton";
import { Button } from "../components/ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import useFetch from "../hooks/useFetch";

const ProductDetailPage = () => {
  const { data: productData, loading, error, request } = useFetch();
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  

  useEffect(() => {
    request(`/products/${productId}`, "GET");
  }, [productId]);

  if (error) return <p>Error: {error}</p>;

  if (!productData) {
    return <h1 className="text-center text-white">Loading product...</h1>;
  }

  const { discount, imageUrl, name, price, stock } = productData;

  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < stock) {
      setQuantity(quantity + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const stockClass = () => {
    if (stock === 0) {
      return "text-red-500";
    } else if (stock < 10) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Gambar Produk */}
          <div>
            {loading ? (
              <Skeleton className="w-full h-[582px]" />
            ) : (
              <img src={imageUrl} alt={name} className="w-full" />
            )}
            {/* Thumbnail Gambar */}
            <div className="flex gap-2 mt-4">
              <img
                src="/thumbnail1.jpg"
                alt="Thumbnail 1"
                className="w-16 h-16 cursor-pointer"
              />
              <img
                src="/thumbnail2.jpg"
                alt="Thumbnail 2"
                className="w-16 h-16 cursor-pointer"
              />
              <img
                src="/thumbnail3.jpg"
                alt="Thumbnail 3"
                className="w-16 h-16 cursor-pointer"
              />
              <img
                src="/thumbnail4.jpg"
                alt="Thumbnail 4"
                className="w-16 h-16 cursor-pointer"
              />
            </div>
          </div>

          {/* Detail Produk */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl">{name}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {/* Terjual */}
                <div className="flex items-center space-x-1">
                  <span className="text-primary font-semibold">Terjual</span>
                  <span className="font-semibold">100+</span>
                </div>
                {/* Separator */}
                <span>•</span>
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">5</span>
                  <span className="text-gray-500 text-sm ">(6 rating)</span>
                </div>
              </div>
            </div>
            <h3 className="text-3xl font-bold">
              Rp {Number(price).toLocaleString("id-ID")}
            </h3>
            <p className="text-sm text-muted-foreground mt-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis
              nulla atque quisquam nesciunt soluta iste, laboriosam magnam nobis
              rem laudantium saepe vitae id esse doloremque animi beatae! Neque,
              est harum.
            </p>
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleQuantityChange("decrement")}
                disabled={quantity <= 1}
              >
                <IoIosRemove className="h-6 w-6" />
              </Button>
              <p className="text-lg font-bold">{quantity}</p>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleQuantityChange("increment")}
                disabled={quantity >= stock}
              >
                <IoIosAdd className="h-6 w-6" />
              </Button>
              <span className={stockClass()}>{stock} in stock</span>
            </div>
            <div className="flex items-center mt-4 gap-4">
              <Button disabled={stock <= 0} className="w-full" size="lg">
                Add to cart
              </Button>
              <Button size="icon" variant="ghost">
                <IoHeartOutline className="h-6 w-6" />
              </Button>
            </div>
            {/* Tabs Detail, Spesifikasi, Info Penting */}
            <div className="mt-8">
              <ul className="flex border-b">
                <li className="mr-12 pb-3 border-b-2 border-green-500">
                  <a href="#detail">Detail</a>
                </li>
                <li className="mr-12 pb-3">
                  <a href="#spesifikasi">Spesifikasi</a>
                </li>
                <li className="pb-3">
                  <a href="#info-penting">Info Penting</a>
                </li>
              </ul>
              <div id="detail" className="mt-4">
                <p>Kondisi: Baru</p>
                <p>Min. Pemesanan: 1 Buah</p>
                <p>Etalase: COC GAMERS BOX</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  repellat, adipisci quisquam voluptatum libero id reprehenderit
                  autem ducimus ipsam aspernatur!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
