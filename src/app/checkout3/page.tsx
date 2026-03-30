'use client';

import { Steps } from '@/components/checkout/Steps';
import { TrackOrder } from '@/components/checkout/TrackOrder';
import { DriverInfo } from '@/components/checkout/DriverInfo';
import { OrderOption } from '@/components/checkout/OrderOption';
import CartSummary from '@/app/checkout/components/CartSummary';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

function getTodaysDate(): string {
  const now = new Date();
  const arrival = new Date(now.getTime() + 45 * 60000);
  const dateStr = arrival.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = arrival.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `Today, ${dateStr} at ${timeStr} in 45 minutes`;
}

interface Driver {
  name?: string;
  phone?: string;
  image?: string;
  rating?: number;
}

interface Checkout3PageProps {
  orderStatus?: {
    currentStatus: string;
    estimatedDelivery: string;
    steps?: { id: number; status: 'completed' | 'active' | 'pending' }[];
  };
  driver?: Driver;
  deliveryAddress?: string;
  lastOrderId?: string;
  onDownloadReceipt?: () => void;
  onReorder?: () => void;
  onSubmitFeedback?: (feedback: {
    rating: number;
    feedback: string;
  }) => Promise<void>;
  onDriverCall?: () => void;
  onDriverChat?: () => void;
  isLoading?: {
    tracking?: boolean;
    driver?: boolean;
    receipt?: boolean;
    feedback?: boolean;
  };
  errors?: {
    tracking?: boolean;
    driver?: boolean;
  };
}

export default function CheckoutPage3({
  orderStatus = {
    currentStatus: 'Out for Delivery',
    estimatedDelivery: getTodaysDate(),
  },
  driver,
  deliveryAddress = 'Villa 14, Street 23, District 5, New Cairo, Cairo',
  lastOrderId,
  onDownloadReceipt,
  onReorder,
  onSubmitFeedback,
  onDriverCall,
  onDriverChat,
  isLoading = {},
  errors = {},
}: Checkout3PageProps) {
  const router = useRouter();
  const [specialNotes, setSpecialNotes] = useState<string>('');

  useEffect(() => {
    const notes = localStorage.getItem('specialDeliveryNotes');
    if (notes) {
      setSpecialNotes(notes);
    }
  }, []);

  const handleReorder = () => {
    if (onReorder) {
      onReorder();
    } else {
      router.push('/checkout1');
    }
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <h1 className="text-3xl font-bold text-[#014162] mb-4">Order Placed</h1>
      </div>
      <Steps currentStep={3} />
      <div className="max-w-5xl mx-auto p-6 space-y-10 bg-white">
        {/* Special Delivery Notes Display */}
        {specialNotes && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-semibold text-amber-800 mb-1">Special Delivery Notes</p>
            <p className="text-amber-700">{specialNotes}</p>
          </div>
        )}

        <TrackOrder
          currentStatus={orderStatus.currentStatus}
          estimatedDelivery={orderStatus.estimatedDelivery}
          steps={orderStatus.steps}
          isLoading={isLoading.tracking}
          error={errors.tracking}
        />
        <DriverInfo
          driver={driver}
          isLoading={isLoading.driver}
          error={errors.driver}
          onCall={onDriverCall}
          onChat={onDriverChat}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 w-full">
          <CartSummary quantity={0} totalH={0} readOnly={true} />
          <OrderOption
            deliveryAddress={deliveryAddress}
            onDownloadReceipt={onDownloadReceipt}
            onReorder={handleReorder}
            onSubmitFeedback={onSubmitFeedback}
            isReceiptLoading={isLoading.receipt}
            isFeedbackSubmitting={isLoading.feedback}
            lastOrderId={lastOrderId}
          />
        </div>
      </div>
    </div>
  );
}
