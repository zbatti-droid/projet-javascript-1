import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";
import { formatCurrency } from "../utils/formatCurrency";

interface ProductItemProps {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity?: number;
  stock?: number;
}

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
}: ProductItemProps) => {
  const imageSrc =
    image.startsWith("http") || image.startsWith("/")
      ? image
      : `/assets/${image}`;

  return (
    <div className="w-[300px] max-sm:w-full">
      <Link to={`/product/${id}`} className="block">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="h-[400px] w-full object-contain bg-gray-50"
        />

        <h3 className="mt-3 text-xl font-bold">{title}</h3>

        <p className="mt-1 text-gray-500">
          {formatCategoryName(category)}
        </p>

        <p className="mt-2 font-bold">{formatCurrency(price)}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
