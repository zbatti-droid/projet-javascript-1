import { memo } from "react";
import ProductItem from "./ProductItem";

interface Product {
  id: string | number;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity?: number;
  stock?: number;
}

interface ProductGridProps {
  products?: Product[];
}

const ProductGrid = ({ products = [] }: ProductGridProps) => {
  return (
    <div
      className="
        mx-auto
        mt-12
        flex
        max-w-screen-2xl
        flex-wrap
        gap-8
        px-5
        max-xl:justify-start
        max-xl:gap-5
        max-[400px]:px-3
      "
    >
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            id={String(product.id)}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            popularity={product.popularity}
            stock={product.stock}
          />
        ))
      ) : (
        <div className="w-full py-12 text-center">
          <p className="text-lg text-gray-500">
            لا توجد منتجات متاحة حالياً.
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(ProductGrid);