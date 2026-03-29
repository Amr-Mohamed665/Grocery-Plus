import { Mail, MessageCircle, Phone } from "lucide-react";

const support = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    desc: "Chat with our support team",
    sub: "Available now",
  },
  {
    icon: Phone,
    title: "Call Us",
    desc: "+20 2 5555 4837",
    sub: "Mon–Sat 8AM–9PM",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "help@groceryplus.com",
    sub: "24–48 hour response",
  },
];

export default function SupportMethods() {
  return (
    <div className="flex flex-col gap-5">
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {support.map((item) => (
          <div
            key={item.title}
            className="rounded-lg bg-[#0A4868] p-4 text-white"
          >
            <item.icon className="h-6 w-6" />
            <h3 className="mt-2 font-medium">{item.title}</h3>
            <p className="text-sm opacity-90">{item.desc}</p>
            <p className="mt-1 text-xs opacity-70">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
