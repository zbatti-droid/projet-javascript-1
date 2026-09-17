import React, {
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";

import customFetch from "../axios/custom";
import { useAppDispatch } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

type ProductGridWrapperProps = {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
};

const ProductGridWrapper = ({
  searchQuery = "",
  sortCriteria = "",
  category = "",
  page = 1,
  limit,
  children,
}: ProductGridWrapperProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await customFetch.get<Product[]>("/products");

      if (!Array.isArray(response.data)) {
        throw new Error("Products response is not an array");
      }

      let filteredProducts = response.data.filter((product) =>
        product.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );

      if (category && category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (sortCriteria === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      }

      if (sortCriteria === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      if (sortCriteria === "popularity") {
        filteredProducts.sort(
          (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
        );
      }

      dispatch(setTotalProducts(filteredProducts.length));

      let showingProducts = filteredProducts;

      if (limit) {
        showingProducts = filteredProducts.slice(0, limit);
      } else {
        showingProducts = filteredProducts.slice(0, page * 9);
      }

      setProducts(showingProducts);
      dispatch(setShowingProducts(showingProducts.length));
    } catch (err) {
      console.error("Products loading error:", err);

      setProducts([]);
      setError(
        "تعذر تحميل المنتجات. تأكد من تشغيل الخادم وقاعدة البيانات."
      );

      dispatch(setTotalProducts(0));
      dispatch(setShowingProducts(0));
    } finally {
      setIsLoading(false);
    }
  }, [
    searchQuery,
    sortCriteria,
    category,
    page,
    limit,
    dispatch,
  ]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (isLoading) {
    return (
      <p className="py-10 text-center text-gray-500">
        جاري تحميل المنتجات...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-10 text-center text-red-600">
        {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-gray-500">
        لا توجد منتجات متاحة.
      </p>
    );
  }

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { products });
        }

        return child;
      })}
    </>
  );
};

export default ProductGridWrapper;
