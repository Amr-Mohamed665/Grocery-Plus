import Image from "next/image";

import image from "@/assets/tomatos.png"
import { Heart } from "lucide-react";

const favoriteProducts = [
  { id: 1, name: "Organic Bananas", price: 20.9, image: image },
  { id: 2, name: "Fresh Milk - 1L", price: 12.7, image: image },
  { id: 3, name: "Eggs", price: 32.9, image: image },
  { id: 4, name: "Butter", price: 40.9, image: image },
];

function ProductCard({ 
  product, 
  onAdd 
}: { 
  product: typeof favoriteProducts[0]; 
  onAdd: (id: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-[60px] border border-[#014162]/10 rounded-md p-4">
      <div className="flex items-center gap-3 ">
        <Image 
          src={product.image} 
          alt={product.name} 
          className="size-12 rounded-md object-cover bg-[#f3f4f6]" 
        />
        <div className="flex flex-col gap-2">
          <p className="text-sm text-[#0a0a0a]">{product.name}</p>
          <p className="text-sm text-[#041209]">£{product.price}</p>
        </div>
      </div>
      <button
        onClick={() => onAdd(product.id)}
        className="cursor-pointer bg-[#014162] text-white text-sm px-4 py-1.5 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default function Favorite() {
  const handleAddProduct = (id: number) => {
    console.log("Adding product:", id);
  };

  const handleAddAllToCart = () => {
    console.log("Adding all favorites to cart");
  };

  const handleManageFavorites = () => {
    console.log("Managing favorites");
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="size-5 text-[#014162]" />
          <h3 className="text-[#0a0a0a]">Favorite Items</h3>
        </div>
        <button 
          onClick={handleManageFavorites}
          className="text-sm text-[#4c524e]"
        >
          Manage Favorites
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-7">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAddProduct} />
        ))}
      </div>

      {/* Add All Button */}
      <button
        onClick={handleAddAllToCart}
        className="cursor-pointer border border-[#d1d5dc] rounded-md py-3 text-[#0a0a0a] text-center w-full"
      >
        Add All Favorites to Cart
      </button>
    </div>
  );
}
