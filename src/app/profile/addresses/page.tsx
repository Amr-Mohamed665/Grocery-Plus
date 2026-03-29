"use client";

import AddAddressDialog from "@/app/profile/addresses/_components/AddAdress";
import AddressCard from "./_components/addressCard";
import DeliveryWindows from "./_components/Delivery";
import Head from "@/components/common/Head";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function AddressesPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Head
          title="Delivery Addresses"
          description="Manage your delivery locations and preferences."
        />
        <Button
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-[#014162] hover:bg-[#013550] text-white rounded-xl px-4 h-9 font-bold shadow-sm active:scale-95 transition-all text-xs border-none shrink-0"
        >
          + Create New Address
        </Button>
      </div>

      {open && <AddAddressDialog setOpen={setOpen} />}

      {/* Address Cards */}
      <div>
        <AddressCard setOpen={setOpen} />
      </div>

      {/* Delivery Windows */}
      <DeliveryWindows />
    </div>
  );
}
