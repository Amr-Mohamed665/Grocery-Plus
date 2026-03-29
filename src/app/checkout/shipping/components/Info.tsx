"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CartSummary from "../../components/CartSummary";

import { Car, Van, Package, Clock7, RotateCcw, ClockCheck } from "lucide-react";

const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  createAccount: z.boolean().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  arrival: z.string().min(1, "Arrival time is required"),
});

type FormValues = z.infer<typeof shippingSchema>;

export default function Info() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <section className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-20 mt-6 px-4">
      {/* Contact & Customization */}
      <div className="w-full lg:w-[500px]">
        {/* ================= Contact Information ================= */}
        <p className="font-medium text-lg lg:text-xl mb-2">
          Contact Information
        </p>

        <div className="w-full border border-gray-200 py-6 px-4 lg:py-8 lg:px-6 shadow-sm rounded-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label className="text-sm">First Name</label>
                <Input placeholder="First Name" {...register("firstName")} className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""} />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
              </div>

              <div className="flex flex-col gap-1 w-full sm:w-1/2">
                <label className="text-sm">Last Name</label>
                <Input placeholder="Last Name" {...register("lastName")} className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""} />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-sm">Phone Number</label>
              <Input placeholder="+20***********" {...register("phone")} className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm">Email</label>
              <Input placeholder="name@example.com" {...register("email")} className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""} />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3">
              <Checkbox {...register("createAccount")} />
              <label className="text-xs">
                Create an account for easier check-out next time
              </label>
            </div>
          </form>
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
                {/* Delivery */}
                <button
                  type="button"
                  className=" flex items-center justify-center gap-2 py-2 px-7 rounded-md  text-[#014162] bg-[#BCB8B1]  text-sm sm:text-base font-medium cursor-pointer"
                >
                  <Van className="w-5 h-5" />
                  <span>Delivery</span>
                </button>

                {/* Pick-Up */}
                <button
                  type="button"
                  className="  flex items-center justify-center gap-2 py-2 px-7 rounded-md text-[#014162]  bg-[#BCB8B1] text-sm sm:text-base font-medium cursor-pointer"
                >
                  <Car className="w-5 h-5" />
                  <span>Pick-Up</span>
                </button>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-base lg:text-lg">Address</label>
              <Input
                placeholder="Villa 14, Street 23, District 5, New Cairo"
                {...register("address")}
                className={errors.address ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}

              <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="City" {...register("city")} className={errors.city ? "border-red-500 focus-visible:ring-red-500" : ""} />
                {errors.city && <p className="text-xs text-red-500 sm:hidden">{errors.city.message}</p>}
                <Input placeholder="provenance" {...register("province")} className={errors.province ? "border-red-500 focus-visible:ring-red-500" : ""} />
                {errors.province && <p className="text-xs text-red-500 sm:hidden">{errors.province.message}</p>}
                <Input placeholder="Postal Code" {...register("postalCode")} className={errors.postalCode ? "border-red-500 focus-visible:ring-red-500" : ""} />
                {errors.postalCode && <p className="text-xs text-red-500 sm:hidden">{errors.postalCode.message}</p>}
              </div>
              <div className="hidden sm:flex sm:flex-row gap-3">
                {errors.city && <p className="text-xs text-red-500 flex-1">{errors.city.message}</p>}
                {errors.province && <p className="text-xs text-red-500 flex-1">{errors.province.message}</p>}
                {errors.postalCode && <p className="text-xs text-red-500 flex-1">{errors.postalCode.message}</p>}
              </div>
            </div>

            {/* Schedule Delivery */}
            <div>
              <p className="text-base lg:text-lg mb-2">Schedule Delivery</p>
              <div className="flex gap-20 justify-start px-1">
                {/* Delivery */}
                <button
                  type="button"
                  className=" flex items-center justify-center gap-2 py-2 px-7 rounded-md  text-[#014162] bg-[#BCB8B1]  text-sm sm:text-base font-medium cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Deliver Now</span>
                </button>

                {/* Pick-Up */}
                <button
                  type="button"
                  className="  flex items-center justify-center gap-2 py-2 px-7 rounded-md text-[#014162]  bg-[#BCB8B1] text-sm sm:text-base font-medium cursor-pointer"
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
                {/* Standard */}
                <button
                  type="button"
                  className=" flex items-center justify-center gap-2 py-2 px-7 rounded-md  text-[#014162] bg-[#BCB8B1]  text-sm sm:text-base font-medium cursor-pointer"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Standard</span>
                </button>

                {/* Priority */}
                <button
                  type="button"
                  className="  flex items-center justify-center gap-2 py-2 px-7 rounded-md text-[#014162]  bg-[#BCB8B1] text-sm sm:text-base font-medium cursor-pointer"
                >
                  <ClockCheck className="w-5 h-5" />
                  <span className="text-sm sm:text-base">Priority</span>
                </button>
              </div>
            </div>

            {/* Estimated Arrival */}
            <div className="flex flex-col gap-1">
              <label className="text-base lg:text-lg ">Estimated Arrival</label>
              <Input
                className={`lg:w-2/3 ${errors.arrival ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                placeholder="45 Min, 30/1/25 at 2:30 PM"
                {...register("arrival")}
              />
              {errors.arrival && <p className="text-xs text-red-500">{errors.arrival.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* ================= Cart Summary ================= */}
      <CartSummary quantity={0} totalH={0} />
    </section>
  );
}
