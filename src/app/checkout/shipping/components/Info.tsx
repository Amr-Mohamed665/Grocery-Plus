"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import CartSummary from "../../components/CartSummary";
import Cta from "../../components/Cta";

import { Car, Van, Package, Clock7, RotateCcw, ClockCheck } from "lucide-react";

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const shippingSchema = z.object({
  // Contact Information
  firstName: z
    .string()
    .min(1, "First Name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long"),
  phone: z
    .string()
    .min(1, "Phone Number is required")
    .min(10, "Phone number must be at least 10 numbers"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  // Radix Checkbox returns "on"/undefined, not a boolean
  createAccount: z.any().optional(),

  // Special Delivery Notes
  specialNotes: z.string().optional(),

  // Customize Your Delivery
  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Address must be at least 10 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .min(4, "City must be at least 4 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .min(4, "Country must be at least 4 characters"),

  fulfilmentMethod: z.enum(["delivery", "pickup"]),
  scheduleDelivery: z.enum(["now", "later"]),
  deliverySpeed: z.enum(["standard", "priority"]),
});

// FormValues — postalCode is kept here so the input field can still register
type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  createAccount?: any;
  specialNotes?: string;
  address: string;
  city: string;
  country: string;
  postalCode?: string;
  fulfilmentMethod: "delivery" | "pickup";
  scheduleDelivery: "now" | "later";
  deliverySpeed: "standard" | "priority";
};

// ─── Error message helper ─────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-0.5">{message}</p>;
}

export default function Info() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fulfilmentMethod: "delivery",
      scheduleDelivery: "now",
      deliverySpeed: "standard",
    },
  });

  const fulfilmentMethod = watch("fulfilmentMethod");
  const scheduleDelivery = watch("scheduleDelivery");
  const deliverySpeed = watch("deliverySpeed");

  const onSubmit = (data: FormValues) => {
    const queryParams = new URLSearchParams({
      address: data.address,
      city: data.city,
      country: data.country,
      postalCode: data.postalCode || "",
      specialNotes: data.specialNotes || "",
    });
    router.push(`/checkout2?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-20 mt-6 px-4">
      {/* Contact & Customization */}
      <div className="w-full lg:w-[500px]">
        {/* ================= Contact Information ================= */}
        <p className="font-medium text-lg lg:text-xl mb-2">
          Contact Information
        </p>

        <div className="w-full border border-gray-200 py-6 px-4 lg:py-8 lg:px-6 shadow-sm rounded-md">
          <div className="space-y-5">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label className="text-sm">First Name <span className="text-red-500">*</span></label>
                <Input
                  placeholder="First Name"
                  {...register("firstName")}
                  className={errors.firstName ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
                <FieldError message={errors.firstName?.message} />
              </div>

              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label className="text-sm">Last Name <span className="text-red-500">*</span></label>
                <Input
                  placeholder="Last Name"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-400 focus-visible:ring-red-400" : ""}
                />
                <FieldError message={errors.lastName?.message} />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-sm">Phone Number <span className="text-red-500">*</span></label>
              <Input
                placeholder="+20***********"
                {...register("phone")}
                className={errors.phone ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.phone?.message} />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm">Email <span className="text-red-500">*</span></label>
              <Input
                placeholder="name@example.com"
                {...register("email")}
                className={errors.email ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.email?.message} />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <Checkbox {...register("createAccount")} />
              <label className="text-xs">
                Create an account for easier check-out next time
              </label>
            </div>
          </div>
        </div>

        {/* ================= Customize Delivery ================= */}
        <div className="mt-6 lg:mt-8">
          <p className="font-medium text-lg lg:text-xl mb-2">
            Customize Your Delivery
          </p>

          <div className="w-full border border-gray-200 py-6 px-4 lg:py-8 lg:px-6 shadow-sm rounded-md space-y-6">
            {/* Fulfilment Method */}
            <div>
              <p className="text-base lg:text-lg mb-2">Fulfilment Method</p>
              <div className="flex gap-20 justify-start px-1">
                <button
                  type="button"
                  onClick={() => setValue("fulfilmentMethod", "delivery", { shouldValidate: true })}
                  className={`flex items-center justify-center gap-2 py-2 px-7 rounded-md text-sm sm:text-base font-medium cursor-pointer transition-all ${
                    fulfilmentMethod === "delivery"
                      ? "bg-[#014162] text-white"
                      : "text-[#014162] bg-[#BCB8B1] hover:bg-[#a8a59e]"
                  }`}
                >
                  <Van className="w-5 h-5" />
                  <span>Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValue("fulfilmentMethod", "pickup", { shouldValidate: true })}
                  className={`flex items-center justify-center gap-2 py-2 px-7 rounded-md text-sm sm:text-base font-medium cursor-pointer transition-all ${
                    fulfilmentMethod === "pickup"
                      ? "bg-[#014162] text-white"
                      : "text-[#014162] bg-[#BCB8B1] hover:bg-[#a8a59e]"
                  }`}
                >
                  <Car className="w-5 h-5" />
                  <span>Pick-Up</span>
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-base lg:text-lg">Address <span className="text-red-500">*</span></label>
              <Input
                placeholder="Villa 14, Street 23, District 5, New Cairo"
                {...register("address")}
                className={errors.address ? "border-red-400 focus-visible:ring-red-400" : ""}
              />
              <FieldError message={errors.address?.message} />

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-col gap-1 flex-1">
                  <Input
                    placeholder="City"
                    {...register("city")}
                    className={errors.city ? "border-red-400 focus-visible:ring-red-400" : ""}
                  />
                  <FieldError message={errors.city?.message} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <Input
                    placeholder="Country"
                    {...register("country")}
                    className={errors.country ? "border-red-400 focus-visible:ring-red-400" : ""}
                  />
                  <FieldError message={errors.country?.message} />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <Input
                    placeholder="Postal Code"
                    {...register("postalCode")}
                  />
                </div>
              </div>
            </div>

            {/* Schedule Delivery */}
            <div>
              <p className="text-base lg:text-lg mb-2">Schedule Delivery</p>
              <div className="flex gap-20 justify-start px-1">
                <button
                  type="button"
                  onClick={() => setValue("scheduleDelivery", "now", { shouldValidate: true })}
                  className={`flex items-center justify-center gap-2 py-2 px-7 rounded-md text-sm sm:text-base font-medium cursor-pointer transition-all ${
                    scheduleDelivery === "now"
                      ? "bg-[#014162] text-white"
                      : "text-[#014162] bg-[#BCB8B1] hover:bg-[#a8a59e]"
                  }`}
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Deliver Now</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValue("scheduleDelivery", "later", { shouldValidate: true })}
                  className={`flex items-center justify-center gap-2 py-2 px-7 rounded-md text-sm sm:text-base font-medium cursor-pointer transition-all ${
                    scheduleDelivery === "later"
                      ? "bg-[#014162] text-white"
                      : "text-[#014162] bg-[#BCB8B1] hover:bg-[#a8a59e]"
                  }`}
                >
                  <Clock7 className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Deliver Later</span>
                </button>
              </div>
            </div>

            {/* Delivery Speed */}
            <div>
              <p className="text-base lg:text-lg mb-2">Delivery Speed</p>
              <div className="flex gap-20 justify-start px-1">
                <button
                  type="button"
                  onClick={() => setValue("deliverySpeed", "standard", { shouldValidate: true })}
                  className={`flex items-center justify-center gap-2 py-2 px-7 rounded-md text-sm sm:text-base font-medium cursor-pointer transition-all ${
                    deliverySpeed === "standard"
                      ? "bg-[#014162] text-white"
                      : "text-[#014162] bg-[#BCB8B1] hover:bg-[#a8a59e]"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setValue("deliverySpeed", "priority", { shouldValidate: true })}
                  className={`flex items-center justify-center gap-2 py-2 px-7 rounded-md text-sm sm:text-base font-medium cursor-pointer transition-all ${
                    deliverySpeed === "priority"
                      ? "bg-[#014162] text-white"
                      : "text-[#014162] bg-[#BCB8B1] hover:bg-[#a8a59e]"
                  }`}
                >
                  <ClockCheck className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Priority</span>
                </button>
              </div>
            </div>

            {/* Estimated Arrival */}
            <div className="flex flex-col gap-1">
              <label className="text-base lg:text-lg">Estimated Arrival</label>
              <p className="text-base lg:text-lg font-bold text-gray-900">
                {(() => {
                  const now = new Date();
                  const arrival = new Date(now.getTime() + 45 * 60000);
                  const timeStr = arrival.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
                  const dateStr = arrival.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: '2-digit' });
                  return `45 Min, ${dateStr} at ${timeStr}`;
                })()}
              </p>
            </div>

            {/* Special Delivery Notes */}
            <div className="flex flex-col gap-1">
              <label className="text-base lg:text-lg">Special Delivery Notes</label>
              <textarea
                {...register("specialNotes")}
                placeholder="Add any special instructions for delivery (e.g., gate code, Leave order at front door, Dont ring doorbell, call 30 mins before arrival, etc.)"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#014162] focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Continue Checkout Button */}
        <Cta
          text="Continue Checkout"
          type="submit"
          disabled={false}
          onClick={() => {}}
        />
      </div>

      {/* ================= Cart Summary ================= */}
      <div className="w-full lg:w-auto">
        <CartSummary quantity={0} totalH={0} />
      </div>
    </form>
  );
}
