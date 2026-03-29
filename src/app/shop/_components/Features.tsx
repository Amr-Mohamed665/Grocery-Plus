import { Badge, Check, Star, Truck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Star,
      title: "Curated Products",
      description: "Provide free home delivery for all product over $100",
    },
    {
      icon: Check,
      title: "Handmade",
      description: "WE ensure the product quality that is our main goal",
    },
    {
      icon: Badge,
      title: "Natural Food",
      description: "Return product within 3 days for any product you buy",
    },
    {
      icon: Truck,
      title: "Free home delivery",
      description: "We ensure the product that you can trust easily",
    },
  ];
  return (
    <div className="bg-white rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <div className="bg-[#014162] text-white p-3 rounded-lg h-fit">
              <feature.icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
