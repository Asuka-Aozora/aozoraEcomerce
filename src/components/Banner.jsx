import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const Banner = () => {
  return (
    <Carousel className="w-full md:w-[1200px] cursor-pointer">
      <CarouselContent>
        {contentData.map((item) => (
          <CarouselItem key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div
                className="relative w-full bg-cover bg-center h-[75vh] md:h-[60vh] rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out transform"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              ></div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
      <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hover:bg-slate-200" />
    </Carousel>
  );
}

export default Banner