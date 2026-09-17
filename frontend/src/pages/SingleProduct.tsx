import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Dropdown, ProductItem, QuantityInput, StandardSelectInput } from "../components";
import customFetch from "../axios/custom";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import { formatCurrency } from "../utils/formatCurrency";
import { ar } from "../translations/ar";

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const SelectInputUpgrade = useMemo(() => WithSelectInputWrapper(StandardSelectInput), []);
  const QuantityInputUpgrade = useMemo(() => WithNumberInputWrapper(QuantityInput), []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productResponse, productsResponse] = await Promise.all([
          customFetch.get<Product>(`/products/${id}`),
          customFetch.get<Product[]>("/products"),
        ]);
        setSingleProduct(productResponse.data);
        setProducts(productsResponse.data);
      } catch {
        setSingleProduct(null);
        toast.error("حدث خطأ أثناء تحميل المنتج");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!singleProduct || singleProduct.stock < 1) return;
    const safeQuantity = Math.min(Math.max(quantity, 1), singleProduct.stock);
    dispatch(addProductToTheCart({
      ...singleProduct,
      id: `${singleProduct.id}-${size}-${color}`,
      productId: singleProduct.id,
      quantity: safeQuantity,
      size,
      color,
    }));
    toast.success("تمت إضافة المنتج إلى السلة");
  };

  if (loading) return <p dir="rtl" className="py-20 text-center">جاري تحميل المنتج...</p>;
  if (!singleProduct) return <p dir="rtl" className="py-20 text-center">المنتج غير موجود.</p>;

  const similarProducts = products
    .filter((product) => product.id !== singleProduct.id && product.category === singleProduct.category)
    .slice(0, 3);

  return (
    <div dir="rtl" className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img src={`/assets/${singleProduct.image}`} alt={singleProduct.title} className="w-full max-h-[900px] object-contain bg-gray-50" />
        </div>
        <div className="flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl">{singleProduct.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-secondaryBrown">{formatCategoryName(singleProduct.category)}</p>
              <p className="font-bold">{formatCurrency(singleProduct.price)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <SelectInputUpgrade selectList={[{ id: "S", value: "صغير S" }, { id: "M", value: "متوسط M" }, { id: "L", value: "كبير L" }, { id: "XL", value: "XL" }]} value={size} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSize(event.target.value)} />
            <SelectInputUpgrade selectList={[{ id: "black", value: "أسود" }, { id: "red", value: "أحمر" }, { id: "blue", value: "أزرق" }, { id: "white", value: "أبيض" }, { id: "pink", value: "وردي" }]} value={color} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setColor(event.target.value)} />
            <QuantityInputUpgrade value={quantity} min={1} max={singleProduct.stock} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(event.target.value))} />
          </div>
          <Button mode="brown" text={singleProduct.stock > 0 ? ar.product.addToCart : "غير متوفر"} onClick={handleAddToCart} disabled={singleProduct.stock < 1} />
          <p className="text-secondaryBrown text-sm">التوصيل داخل المغرب خلال 2 إلى 5 أيام</p>
          <Dropdown dropdownTitle={ar.product.description}>فستان فاخر بتصميم أنيق مناسب للمناسبات والأعراس.</Dropdown>
          <Dropdown dropdownTitle={ar.product.productDetails}>خامة عالية الجودة وتصميم راقٍ.</Dropdown>
          <Dropdown dropdownTitle={ar.product.deliveryDetails}>الدفع عند الاستلام متوفر داخل المغرب.</Dropdown>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div>
          <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center max-lg:text-4xl">منتجات مشابهة</h2>
          <div className="flex flex-wrap justify-between gap-y-8">
            {similarProducts.map((product) => <ProductItem key={product.id} id={product.id} image={product.image} title={product.title} category={product.category} price={product.price} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
