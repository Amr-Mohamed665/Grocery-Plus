'use client';

import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";

interface BillingAddressProps {
  shippingAddress?: string;
  shippingCity?: string;
  shippingCountry?: string;
  shippingPostalCode?: string;
  deliveryAddress?: string;
  billingSameAsDelivery: boolean;
  onBillingSameChange: (value: boolean) => void;
  hasShippingAddress: boolean;
}

export default function BillingAddress({
  shippingAddress = '',
  shippingCity = '',
  shippingCountry = '',
  shippingPostalCode = '',
  deliveryAddress = '',
  billingSameAsDelivery,
  onBillingSameChange,
  hasShippingAddress,
}: BillingAddressProps) {
  const [savedBillingAddress, setSavedBillingAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const address = addressRef.current?.value || '';
    const city = cityRef.current?.value || '';
    const country = countryRef.current?.value || '';
    const postalCode = postalCodeRef.current?.value || '';
    
    const fullAddress = `${address}, ${city}, ${country} ${postalCode}`.trim();
    
    if (!address || !city || !country) {
      return;
    }
    
    setSavedBillingAddress(fullAddress);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="mt-15">
        <h4 className="font-bold text-lg mb-4">Billing Address</h4>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            id="billing"
            checked={billingSameAsDelivery}
            onChange={(e) => onBillingSameChange(e.target.checked)}
            disabled={!hasShippingAddress}
            className="w-4 h-4 rounded border-gray-300 text-[#004a61] focus:ring-[#004a61] disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <label htmlFor="billing" className="text-lg text-gray-400">
            Billing address same as delivery address
          </label>
        </div>
        {billingSameAsDelivery && deliveryAddress ? (
          <div className="p-6 bg-gray-100 rounded-lg border border-black">
            <p className="text-lg font-bold text-black">Billing Address:</p>
            <p className="text-lg font-bold text-black mt-2">{deliveryAddress}</p>
          </div>
        ) : savedBillingAddress && !isEditing ? (
          <>
            <div className="p-6 bg-gray-100 rounded-lg border border-black mb-4">
              <p className="text-lg font-bold text-black">Billing Address:</p>
              <p className="text-lg font-bold text-black mt-2">{savedBillingAddress}</p>
            </div>
            <div className="flex justify-start">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-4 w-auto bg-[#004a61] hover:bg-[#003649] text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
              >
                Update Billing Address
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <label className="text-base lg:text-lg">Address</label>
            <Input
              ref={addressRef}
              placeholder="Villa 14, Street 23, District 5, New Cairo"
              disabled={billingSameAsDelivery && !!deliveryAddress}
              className={billingSameAsDelivery && !!deliveryAddress ? 'bg-gray-100' : ''}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <Input 
                  ref={cityRef}
                  placeholder="City" 
                  disabled={billingSameAsDelivery && !!deliveryAddress}
                  className={billingSameAsDelivery && !!deliveryAddress ? 'bg-gray-100' : ''}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Input 
                  ref={countryRef}
                  placeholder="Country" 
                  disabled={billingSameAsDelivery && !!deliveryAddress}
                  className={billingSameAsDelivery && !!deliveryAddress ? 'bg-gray-100' : ''}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <Input 
                  ref={postalCodeRef}
                  placeholder="Postal Code" 
                  disabled={billingSameAsDelivery && !!deliveryAddress}
                  className={billingSameAsDelivery && !!deliveryAddress ? 'bg-gray-100' : ''}
                />
              </div>
            </div>
            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleSave}
                className="mt-4 w-auto bg-[#004a61] hover:bg-[#003649] text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm"
              >
                {savedBillingAddress ? 'Update Billing Address' : 'Save Billing Address'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
