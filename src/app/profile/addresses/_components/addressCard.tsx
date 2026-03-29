"use client";

import { MapPin, Pencil, Trash, Briefcase, House, Truck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import DeleteDialog from "@/app/profile/addresses/_components/DeleteAddress";
import EditDialog from "@/app/profile/addresses/_components/EditAddress";
import { useAddresses } from "@/hooks/addresses/useAddresses";

export default function AddressCard({ setOpen }: any) {
  const { data } = useAddresses();


  const [openEdit, setOpenEdit] = useState(false);
  const [editAddress, setEditAddress] = useState<any>(null);

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState<any>(null);

  return (
    <div className="space-y-4 sm:flex flex-col lm:flex-col gap-3 sm:justify-between">
      {data?.addresses?.length === 0 && (
        <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 backdrop-blur-sm">
          <div className="bg-white size-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <MapPin className="size-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Your addresses collection is empty
          </h3>
          <p className="text-gray-500 mt-2">
            Start creating addresses to simplify your grocery shopping.
          </p>
          <Button
            variant="outline"
            className="cursor-pointer mt-6 border-gray-200 hover:bg-white rounded-xl font-bold"
            onClick={() => setOpen(true)}
          >
            Add Address
          </Button>
        </div>
      )}
      {data?.addresses?.map((address: any) => (
        <div
          key={address.id}
          className="rounded-lg border bg-[#E6F1F6] p-4 space-y-4"
        >
          {/* Cards */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold">
              {address?.label?.toLowerCase() == "home" ? (
                <House className="h-4 w-4 text-[#0f3d3e]" />
              ) : address?.label?.toLowerCase() == "work" ? (
                <Briefcase className="h-4 w-4 text-[#0f3d3e]" />
              ) : (
                <MapPin className="h-4 w-4 text-[#0f3d3e]" />
              )}
              {address?.label || "Home"}
            </div>

            <div className="flex self-start sm:self-auto">
              <Button
                className="cursor-pointer flex items-center gap-1 text-xs text-gray-600"
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditAddress(address);
                  setOpenEdit(true);
                }}
              >
                <Pencil />
                Edit
              </Button>

              <Button
                className="cursor-pointer flex items-center gap-1 text-xs text-red-500"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setDeleteAddress(address);
                  setOpenDelete(true);
                }}
              >
                <Trash />
                Delete
              </Button>
            </div>
          </div>

          {/* City + Full name */}
          <div className="px-8">
            <p className="text-[#888]">{address.full_name}</p>
          </div>

          {/* Delivery Instructions */}
          <div className="bg-white border border-[#dad8d8] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-4 w-4 text-[#0f3d3e]" />
              <span className="text-[#014162]">Delivery Instructions</span>
            </div>
            <p className="text-[#014162] pl-6">
              {address.notes || "Ring doorbell. Leave at door if no answer."}
            </p>
          </div>
        </div>
      ))}

      {editAddress && (
        <EditDialog
          open={openEdit}
          setOpen={setOpenEdit}
          address={editAddress}
        />
      )}

      {deleteAddress && (
        <DeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          address={deleteAddress}
        />
      )}
    </div>
  );
}
