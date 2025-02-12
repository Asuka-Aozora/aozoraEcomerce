import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  const contentData = [
    {
      id: 1,
      title: "Judul 1",
      imageUrl: "/img/hana.png",
      description: "Deskripsi 1",
    },
    {
      id: 2,
      title: "Judul 2",
      imageUrl: "https://picsum.photos/1201",
      description: "Deskripsi 2",
    },
    {
      id: 3,
      title: "Judul 3",
      imageUrl: "https://picsum.photos/1202",
      description: "Deskripsi 3",
    },
  ];

  return (
    <>
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8 flex flex-col items-center">
        <Carousel className="w-full md:w-[1200px] cursor-pointer">
          <CarouselContent>
            {contentData.map((item) => (
              <CarouselItem key={item.id}>
                <Link to={`/detail/${item.id}`}>
                  <div
                    className="relative w-full bg-cover bg-center h-[75vh] md:h-[60vh] rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform"
                    style={{ backgroundImage: `url(${item.imageUrl})` }}
                  >
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
        </Carousel>
      </main>
    </>
  );
};

export default HomePage;
