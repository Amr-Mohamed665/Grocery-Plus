import Container from "../common/Container";

// Product images
import Head from "@/components/common/Head";
import { CardProductA } from "../common/CardProduct";
import { useEffect, useState } from "react";
import { useNewProducts } from "@/hooks/categories/useCategories";

// Main component
export default function NewProduct() {
  const [data, setData] = useState<any>([]);
  const [category, setCategory] = useState<string>("");
  const { data: newProducts, isLoading: newProductsLoading } = useNewProducts();

  // Get unique categories from newProducts data
  const categories: string[] = newProducts?.newProducts
    ? [...new Set(newProducts.newProducts.map((product: any) => product.category.name))] as string[]
    : [];

  useEffect(() => {
    setData(newProducts?.newProducts);
  }, [newProductsLoading]);

  const upData = (cat: string) => {
    const data = newProducts?.newProducts.filter(
      (meal: any) => meal.category.name === cat,
    );
    setData(data);
    setCategory(cat);
  };

  return (
    <Container className="flex flex-col gap-4 mt-9 md:mt-16 lg:mt-24">
      <Head title="New Product" />

      <div className="hidden sm:flex justify-end content-stretch flex-col items-end relative shrink-0 w-full">
        <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-center justify-between not-italic p-[5px] relative shrink-0 text-[18px] w-auto gap-4">
          <button
            onClick={() => {
              setData(newProducts?.newProducts);
              setCategory("");
            }}
            className={`block cursor-pointer relative shrink-0 text-[#888] ${category === "" && "text-[#014162]"} text-left whitespace-nowrap`}
          >
            All
          </button>
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => upData(cat)}
              className={`block cursor-pointer relative shrink-0 text-[#888] ${category === cat && "text-[#014162]"} text-left whitespace-nowrap`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-5 items-center justify-center flex-wrap">
        {data?.filter((product: any) => 
          !product?.title?.toLowerCase().includes("marwa") &&
          !product?.brand?.toLowerCase().includes("marwa") &&
          !product?.vendor?.toLowerCase().includes("marwa") &&
          !product?.title?.toLowerCase().includes("hot chocolate") &&
          !product?.title?.toLowerCase().includes("hot choclate")
        ).map((product: any) => (
          <CardProductA
            key={product.id}
            title={product.title.replace(/Choclate/g, "Chocolate")}
            image_url={product.image}
            category={product.category.name}
            rating={product.rating}
            rating_count={product.rating_count}
            brand={product.brand}
            price={product.discount_price}
            final_price={product.price}
            discount={product.discount}
            link={product.id}
            in_stock={product.stock_quantity}
          />
        ))}
      </div>
    </Container>
  );
}
