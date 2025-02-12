import { Link } from "react-router-dom";

export const ProductCard = () => {
  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link
        to={`/products/id`}
        className="aspect-square w-full overflow-hidden"
      >
        <img
          className="w-full"
          src="https://m.media-amazon.com/images/I/61w-oDCjydL._AC_SX679_.jpg"
          alt="product"
        />
      </Link>

      <Link to={`/products/id`}>
        <p className="text-md font-sans font-medium tracking-wide text-gray-900">
          Nvidia GeForce RTX 3090 Founders Edition Graphics Card
        </p>
        <p>Rp {Number(120000).toLocaleString("id-ID")}</p>
        {/* <p className='text-xl font-semibold'>
            Harga Diskon: Rp {Number(discount).toLocaleString('id-ID')}
            </p> */}
        <p className="text-muted-foreground">In stock: 10</p>
      </Link>
    </div>
  );
};
