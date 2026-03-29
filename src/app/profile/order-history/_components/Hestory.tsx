"use client";

import { useState } from "react";
import { useOrders } from "@/hooks/orders/useOrders";
import { ReceiptText, RefreshCcwDot, Star } from "lucide-react";
import Head from "@/components/common/Head";

function OrderItem({
  name,
  quantity,
  image,
}: {
  name: string;
  quantity: number;
  image: string;
}) {
  return (
    <div className="bg-[#f7fcff] flex gap-2 items-center p-2 rounded-lg border border-[#f0f7ff]">
      <div className="bg-[#f9fafb] rounded-xl size-12 overflow-hidden shrink-0 border border-[#eee]">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[#0e1112] text-[13px] font-medium leading-tight line-clamp-1">
          {name}
        </p>
        <p className="text-[#666] text-xs">Qty: {quantity}</p>
      </div>
    </div>
  );
}

function Button({
  label,
  variant = "secondary",
  icon,
}: {
  label: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}) {
  return (
    <button
      className={`cursor-pointer flex gap-2 items-center justify-center p-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] min-w-[140px] flex-1 ${
        variant === "primary"
          ? "bg-[#014162] text-[#f7fcff]"
          : "bg-[#bcb8b1]/20 text-[#014162] border border-[#bcb8b1]/30"
      }`}
    >
      {icon && <span className="size-4">{icon}</span>}
      <span className="text-sm font-medium leading-tight">{label}</span>
    </button>
  );
}

function OrderCard({ order }: { order: any }) {
  const [showAll, setShowAll] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const visibleItems = showAll ? order.items : order.items.slice(0, 2);
  const remainingCount = order.items.length - 2;

  return (
    <div className="border border-[#dad8d8] rounded-2xl p-4 sm:p-6 w-full bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between border border-[#eee] p-4 rounded-xl mb-4">
        <div>
          <p className="text-[#0a0a0a] text-sm font-bold">
            Order #GP{order.id}
          </p>
          <p className="text-[#888] text-[13px]">
            {formatDate(order.created_at)} • {order.items.length} Items
          </p>
        </div>
        <div
          className={`text-xs p-2 px-3 rounded-md font-medium capitalize ${
            order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          {order.status}
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-wrap gap-3 mb-6">
        {visibleItems.map((item: any) => (
          <div
            key={item.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-12px)]"
          >
            <OrderItem
              name={item.meal?.title || "Product"}
              quantity={item.quantity}
              image={item.meal?.image_url || "/placeholder.png"}
            />
          </div>
        ))}
        {!showAll && remainingCount > 0 && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-12px)] bg-[#f7fcff] flex items-center justify-center p-3 rounded-lg border border-dashed border-[#014162]/30 hover:bg-[#edf7ff] transition-colors cursor-pointer group h-[66px]"
          >
            <p className="text-[#014162] text-[13px] font-semibold group-hover:underline">
              +{remainingCount} More Items
            </p>
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
            Total Amount
          </span>
          <p className="font-bold text-[#014162] text-2xl">£{order.total}</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button label="Receipt" icon={<ReceiptText className="size-4" />} />
          <Button label="Rate" icon={<Star className="size-4" />} />
          <Button
            label="Reorder"
            variant="primary"
            icon={<RefreshCcwDot className="size-4" />}
          />
        </div>
      </div>
    </div>
  );
}

export default function History() {
  const { data: orderHistory, isLoading } = useOrders();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [timeRange, setTimeRange] = useState("all");

  const orders = orderHistory?.orders || [];

  const filteredOrders = orders.filter((order: any) => {
    // Search filter
    const matchesSearch =
      order.id.toString().includes(search) ||
      order.items.some((item: any) =>
        item.meal?.title?.toLowerCase().includes(search.toLowerCase()),
      );

    // Status filter
    const matchesStatus =
      status === "all" || order.status.toLowerCase() === status.toLowerCase();

    // Time filter
    let matchesTime = true;
    if (timeRange !== "all") {
      const orderDate = new Date(order.created_at);
      const now = new Date();
      const diffDays =
        (now.getTime() - orderDate.getTime()) / (1000 * 3600 * 24);
      matchesTime = diffDays <= parseInt(timeRange);
    }

    return matchesSearch && matchesStatus && matchesTime;
  });

  if (isLoading) {
    return <div className="flex justify-center py-10">Loading orders...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Head
        title="Order History"
        description="Manage your past orders and track your spending."
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by meal name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#DAD8D8] rounded-xl py-2.5 px-4 outline-none focus:border-[#014162] focus:ring-1 focus:ring-[#014162]/10 transition-all text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 min-w-[120px] border py-2 px-4 border-[#DAD8D8] rounded-xl text-sm bg-white cursor-pointer hover:bg-gray-50 outline-none"
          >
            <option value="all">All Status</option>
            <option value="placed">Placed</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="flex-1 min-w-[120px] border py-2 px-4 border-[#DAD8D8] rounded-xl text-sm bg-white cursor-pointer hover:bg-gray-50 outline-none"
          >
            <option value="all">All Time</option>
            <option value="10">Last 10 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order: any) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <ReceiptText className="size-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No orders found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
