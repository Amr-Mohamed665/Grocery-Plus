import { Instagram, Linkedin, Facebook, MapPin, Mail } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Logo.png"

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-xl font-semibold text-gray-800">
        {title}
      </h4>
      <ul className="space-y-5 text-sm text-gray-700">
        {items.map((item) => (
          <li
            key={item}
            className=" w-fit cursor-pointer hover:text-blue-900 hover:translate-x-1 duration-300 font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-10 bg-[#f8fbfd] border-t-2 border-gray-200">
      <div className="mx-auto max-w-7xl px-8 lg:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]  gap-10">
          <div>
            <Image src={logo} alt="logo" />

            <div className="mt-4 flex gap-4 text-gray-900">
              <Instagram size={20} className="cursor-pointer hover:text-blue-900 hover:scale-105" />
              <Linkedin size={20} className="cursor-pointer hover:text-blue-900 hover:scale-105" />
              <Facebook size={20} className="cursor-pointer hover:text-blue-900 hover:scale-105" />
            </div>

            <p className="mt-5 w-[90%] font-medium text-sm leading-6 text-gray-800">
              Grocery platform offering fresh produce, daily essentials,
              personalized recommendations, and seamless ordering with
              secure payments and real-time tracking.
            </p>

            <div className="mt-5 space-y-6 text-sm text-gray-800 font-medium">
              <div className="flex items-start gap-2">
                <MapPin size={20} className="mt-0.5" />
                <span>
                  5th Settlement, New Cairo, Cairo, Egypt
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={20} />
                <span>help@groceryplus.com</span>
              </div>
            </div>
          </div>

          <FooterColumn
            title="Support"
            items={["FAQ", "Contact Us", "Chat"]}
          />

          <FooterColumn
            title="Services"
            items={[
              "Order tracking",
              "Smart List",
              "Sign - up",]}
          />

          <FooterColumn
            title="Terms and Policies"
            items={[
              "About Us",
              "Terms of Use",
              "Privacy Policy",
              "Return Policy",
              "Cookies Policy",
            ]}
          />
        </div>
      </div>

      <div className="bg-blue-900 py-2 text-center text-xs text-white">
        © 2025 GroceryPlus - Smart Grocery, Delivered Fast. All Rights Reserved.
      </div>
    </footer>
  );
}

