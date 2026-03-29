"use client";

// Schemas
import { personalSchema } from "@/lib/schemas/personal";

// Icons
import { Mail, Phone, SquarePen, User } from "lucide-react";

// React Hooks
import { useEffect, useState } from "react";

// Form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Hooks
import { useUpdateUser } from "@/hooks/profile/useProfile";

// UI Components
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// types
// import { UserUpdateData } from "@/lib/types/user";

type FormData = z.infer<typeof personalSchema>;

// export default function Basic({ dataUser }: { dataUser: UserUpdateData }) {
export default function Basic() {
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");

  const mutatuin = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(personalSchema),
    // defaultValues: dataUser || {
    defaultValues: {
      firstname: "Omar",
      lastname: "Elbastawesy",
      email: "[EMAIL_ADDRESS]",
      phone: "+201012345678",
    },
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
  }, [open]);

  // useEffect(() => {
  //   if (dataUser) {
  //     reset(dataUser);
  //     setLanguage(dataUser.preferred_languages[0]);
  //   }
  // }, [dataUser, reset]);

  const handleEdit = () => {
    setEdit(true);
  };

  // Update Profile
  const onSubmit = async (data: FormData) => {
    try {
      const fullData: any = {
        ...data,
        preferred_languages: [language],
      };
      // mutate(fullData);
      mutatuin.mutate(fullData);
      setEdit(false);
      setSuccess(true);
      setOpen(true);
    } catch (error: any) {
      setSuccess(false);
      setOpen(true);
    }
  };

  return (
    <>
      {success ? (
        <AlertData
          success={success}
          title="Success"
          message="Profile updated successfully"
          open={open}
        />
      ) : (
        <AlertData
          success={success}
          title="Failed"
          message="Failed to update profile"
          open={open}
        />
      )}
      <div className="bg-white border border-[#dad8d8] rounded-lg p-6 w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] text-black">Basic Information</h2>
          {edit ? (
            <button
              onClick={handleSubmit(onSubmit)}
              className="cursor-pointer bg-[#27a9ff] flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-[#45b4ff] transition-colors"
            >
              <SquarePen className="text-[#0e1112]" />
              <span className="text-[#0e1112] text-[16px]">Save</span>
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="cursor-pointer bg-[#dad8d8] flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-[#c5c3c3] transition-colors"
            >
              <SquarePen className="text-[#0e1112]" />
              <span className="text-[#0e1112] text-[16px]">Edit</span>
            </button>
          )}
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* First Row */}
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <label
                className={`${errors.firstname ? "text-red-500" : "text-[#1e1e1e]"} text-[18px]`}
              >
                First Name
              </label>
              <div
                className={` relative bg-white border min-w-75 ${errors.firstname ? "border-red-500" : "border-[#dad8d8]"} rounded-lg flex items-center gap-4`}
              >
                <User className="absolute left-10 text-[#888]" />
                <input
                  className={`${errors.firstname ? "focus:outline-red-500" : "focus:outline-[#dad8d8]"} text-[#888] text-[16px] rounded-lg pl-20 w-full py-3 flex items-center gap-4 disabled:bg-gray-50`}
                  type="text"
                  disabled={!edit}
                  {...register("firstname")}
                />
              </div>
              <p className="text-red-500 text-sm pr-4">
                {errors.firstname?.message}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label
                className={`${errors.lastname ? "text-red-500" : "text-[#1e1e1e]"} text-[18px]`}
              >
                Last Name
              </label>
              <div
                className={` relative bg-white border min-w-75 ${errors.lastname ? "border-red-500" : "border-[#dad8d8]"} rounded-lg flex items-center gap-4`}
              >
                <User className="absolute left-10 text-[#888]" />
                <input
                  className={`${errors.lastname ? "focus:outline-red-500" : "focus:outline-[#dad8d8]"} text-[#888] text-[16px] rounded-lg pl-20 w-full py-3 flex items-center gap-4 disabled:bg-gray-50`}
                  type="text"
                  disabled={!edit}
                  {...register("lastname")}
                />
              </div>
              <p className="text-red-500 text-sm pr-4">
                {errors.lastname?.message}
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <label
                className={`${errors.email ? "text-red-500" : "text-[#1e1e1e]"} text-[18px]`}
              >
                Email Address
              </label>
              <div
                className={` relative bg-white border min-w-75 ${errors.email ? "border-red-500" : "border-[#dad8d8]"} rounded-lg flex items-center gap-4`}
              >
                <Mail className="absolute left-10 text-[#888]" />
                <input
                  className={`${errors.email ? "focus:outline-red-500" : "focus:outline-[#dad8d8]"} text-[#888] text-[16px] rounded-lg pl-20 w-full py-3 flex items-center gap-4 disabled:bg-gray-50`}
                  type="text"
                  disabled={!edit}
                  {...register("email")}
                />
              </div>
              <p className="text-red-500 text-sm pr-4">
                {errors.email?.message}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label
                className={`${errors.phone ? "text-red-500" : "text-[#1e1e1e]"} text-[18px]`}
              >
                Phone Number
              </label>
              <div
                className={` relative bg-white border min-w-75 ${errors.phone ? "border-red-500" : "border-[#dad8d8]"} rounded-lg flex items-center gap-4`}
              >
                <Phone className="absolute left-10 text-[#888]" />
                <input
                  className={`${errors.phone ? "focus:outline-red-500" : "focus:outline-[#dad8d8]"} text-[#888] text-[16px] rounded-lg pl-20 w-full py-3 flex items-center gap-4 disabled:bg-gray-50`}
                  type="text"
                  disabled={!edit}
                  {...register("phone")}
                />
              </div>

              <p className="text-red-500 text-sm pr-4">
                {errors.phone?.message}
              </p>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white border border-[#dad8d8] rounded-lg p-6 w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Header */}
        <h2 className="text-[20px] text-black mb-4">Language</h2>

        {/* Preferred Language Section */}
        <div className="flex flex-col gap-2">
          <label className="text-[#1e1e1e] text-[18px]">
            Preferred Language
          </label>

          {/* Language Dropdown */}
          <div>
            <div className="w-full max-w-52.5">
              <Select
                disabled={!edit}
                onValueChange={(value) => setLanguage(value)}
                value={language}
              >
                <SelectTrigger className="bg-white text-[#888888] border-[#dad8d8] h-11 w-52.5 px-10">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="en-us"
                    className="text-[16px] text-[#888888]"
                  >
                    English (US)
                  </SelectItem>
                  <SelectItem
                    value="ar-eg"
                    className="text-[16px] text-[#888888]"
                  >
                    العربية (Egypt)
                  </SelectItem>
                  <SelectItem
                    value="fr-fr"
                    className="text-[16px] text-[#888888]"
                  >
                    Français (France)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const AlertData = ({
  success,
  title,
  message,
  open,
}: {
  success: boolean;
  title: string;
  message: string;
  open: boolean;
}) => {
  return (
    <Alert
      className={`fixed top-5 right-5 z-50 w-75 shadow-xl transition-all duration-500 ease-out ${
        open ? "translate-x-0 opacity-100" : "translate-x-[150%] opacity-0"
      } ${success ? "bg-[#d1fae5] border-green-400 text-green-800" : "bg-[#fee2e2] border-red-400 text-red-800"}`}
    >
      <Mail
        className={`h-4 w-4 ${success ? "text-green-600" : "text-red-600"}`}
      />
      <div className="ml-2">
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription className="text-sm">{message}</AlertDescription>
      </div>
    </Alert>
  );
};
