import { Link } from "react-router-dom";


export const ProductCard = ({ imageUrl, productName, price, stock, productId }) => {
  
  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link
        to={`/products/${productId}`}
        className="aspect-square w-full overflow-hidden"
      >
        <img className="w-full" src={imageUrl} alt="product" />
      </Link>

      <Link to={`/products/${productId}`}>
        <p className="text-md font-sans font-medium tracking-wide text-gray-900">
          {productName}
        </p>
        <p>Rp {Number(price).toLocaleString("id-ID")}</p>
        {/* <p className='text-xl font-semibold'>
            Harga Diskon: Rp {Number(discount).toLocaleString('id-ID')}
            </p> */}
        <p className="text-muted-foreground">In stock: {stock}</p>
      </Link>

      <div>
        
      </div>
    </div>
  );
};
