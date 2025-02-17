import { ProductCard } from "../components/ProductCard";
import contentData from "@/content/contentData.json";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Banner from "../components/Banner";
import Spinner from "../components/spinner";
import useFetch from "../hooks/useFetch";


const HomePage = () => {
  const { data: products, loading, error, request } = useFetch();

  useEffect(() => {
    request("/api/items", "GET");
  }, []);

  if (loading) return <p>Loading...</p>;

  const productsList = products?.map((isi, index) => {
    return (
      <ProductCard
        key={index}
        imageUrl={isi.imageUrl}
        productName={isi.name}
        stock={isi.stock}
        price={isi.price}
        productId={isi.id}
        // discount={isi.price * (1 - isi.discount)}
      />
    );
  });

  return (
    <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col items-center">
      {loading ? <Spinner /> : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          <Banner contentData={contentData} />
          <div className="mt-8">
            <h1 className="text-2xl font-bold mb-4">Best Seller</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {productsList}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default HomePage;

