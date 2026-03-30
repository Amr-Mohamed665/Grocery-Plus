import Container from "../common/Container";

// Product images
import brocccoli from "@/assets/brocccoli.png";
import greenBeans from "@/assets/green-beans.png";
import potatos from "@/assets/potatos.png";
import redish from "@/assets/redish.png";
import tomatoes from "@/assets/tomatos.png";
import Head from "@/components/common/Head";
import { CardProductA } from "../common/CardProduct";
import { useBestSells } from "@/hooks/categories/useCategories";

// Product type definition
type Product = {
  id: number;
  image: any;
  category: string;
  name: string;
  rating: number;
  reviewCount: number;
  vendor: string;
  price: string;
  originalPrice: string;
};

// Product data
const products: Product[] = [
  {
    id: 1,
    image: redish,
    category: "Vegetables",
    name: "Redish 500g",
    rating: 4,
    reviewCount: 4,
    vendor: "Mr.food",
    price: "£12",
    originalPrice: "£15.99",
  },
  {
    id: 2,
    image: potatos,
    category: "Vegetables",
    name: "Potatos 1g",
    rating: 3,
    reviewCount: 3,
    vendor: "Mr.food",
    price: "£20",
    originalPrice: "£25.99",
  },
  {
    id: 3,
    image: tomatoes,
    category: "Vegetables",
    name: "Tomatos 200g",
    rating: 3,
    reviewCount: 3,
    vendor: "Mr.food",
    price: "£24",
    originalPrice: "£28.99",
  },
  {
    id: 4,
    image: greenBeans,
    category: "Vegetables",
    name: "Green Beans 350g",
    rating: 2,
    reviewCount: 2,
    vendor: "Mr.food",
    price: "£8",
    originalPrice: "£12.99",
  },
  {
    id: 5,
    image: brocccoli,
    category: "Vegetables",
    name: "Brocccoli 1kg",
    rating: 2,
    reviewCount: 2,
    vendor: "Mr.food",
    price: "£17",
    originalPrice: "£20.00",
  },
];

// Main component
export default function BestSells() {
  const { data: bestSells } = useBestSells();

  return (
    <Container className="flex flex-col gap-4">
      <Head title="Daily Best Sells" />

      <div className="flex gap-5 items-center justify-center flex-wrap">
        {bestSells?.bestSells?.filter((product: any) =>
          !product?.title?.toLowerCase().includes("marwa") &&
          !product?.brand?.toLowerCase().includes("marwa") &&
          !product?.vendor?.toLowerCase().includes("marwa") &&
          !product?.title?.toLowerCase().includes("chocolate") &&
          !product?.title?.toLowerCase().includes("choclate")
        ).map((product: any) => (
          <CardProductA
            key={product.id}
            title={product.title}
            image_url={product.image}
            category={product.category.name}
            rating={product.rating}
            rating_count={product.rating_count}
            brand={product.brand}
            price={product.price}
            final_price={product.discount_price}
            link={product.id}
            in_stock={product.stock_quantity}
          />
        ))}
      </div>
    </Container>
  );
}
