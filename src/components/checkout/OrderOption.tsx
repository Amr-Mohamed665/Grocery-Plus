'use client';

import { useState } from 'react';
import { Star, Loader2 } from 'lucide-react';

interface OrderOptionProps {
  deliveryAddress?: string;
  onDownloadReceipt?: () => void;
  onReorder?: () => void;
  onSubmitFeedback?: (feedback: {
    rating: number;
    feedback: string;
  }) => Promise<void>;
  isReceiptLoading?: boolean;
  isFeedbackSubmitting?: boolean;
  lastOrderId?: string;
}

export function OrderOption({
  deliveryAddress = 'Villa 14, Street 23, District 5, New Cairo, Cairo',
  onDownloadReceipt,
  onReorder,
  onSubmitFeedback,
  isReceiptLoading = false,
  isFeedbackSubmitting = false,
}: OrderOptionProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [offerCode, setOfferCode] = useState('Azu280');
  const [appliedOffer, setAppliedOffer] = useState(false);

  const handleApplyOffer = () => {
    if (offerCode.trim()) {
      setAppliedOffer(true);
      console.log('Offer applied:', offerCode);
    }
  };

  const handleSubmitFeedback = async () => {
    if (onSubmitFeedback && rating > 0) {
      try {
        await onSubmitFeedback({ rating, feedback: feedbackText });
        console.log('Feedback submitted successfully');
      } catch (error) {
        console.error('Failed to submit feedback:', error);
      }
    }
    setRating(0);
    setFeedbackText('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold mb-4">Order Options</h3>
      <div className="border border-gray-100 rounded-xl bg-white p-6 shadow-sm space-y-6">
        <div>
          <p className="text-gray-800 text-sm mb-2">Delivery Address</p>
          <div className="bg-gray-50 border p-3 rounded-lg text-xs text-gray-500">
            {deliveryAddress}
          </div>
        </div>

        <p className="text-gray-800 text-sm mb-2">Current Order</p>
        <div className="flex gap-4">
          <button
            onClick={onDownloadReceipt}
            disabled={isReceiptLoading}
            className="flex-1 bg-[#004a61] hover:bg-[#003649] text-white cursor-pointer py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isReceiptLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>Download Receipt</>
            )}
          </button>
          <button
            onClick={onReorder}
            className="flex-1 bg-[#004a61] hover:bg-[#003649] text-white cursor-pointer py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
          >
            Reorder
          </button>
        </div>

        <div>
          <p className="text-gray-600 text-xs mb-3">How Was Your Experience</p>
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              return (
                <Star
                  key={i}
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    starValue <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-400'
                  }`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              );
            })}
          </div>
          <textarea
            className="w-full bg-gray-50 border rounded-xl h-20 p-3 text-xs outline-none focus:ring-2 focus:ring-[#004a61] focus:border-transparent"
            placeholder="Add your feedback..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
          {feedbackText && (
            <button
              onClick={handleSubmitFeedback}
              disabled={isFeedbackSubmitting}
              className="mt-2 bg-[#004a61] hover:bg-[#003649] text-white text-xs font-bold disabled:opacity-50 px-4 py-2 rounded-lg"
            >
              {isFeedbackSubmitting ? (
                <Loader2 className="animate-spin inline" size={14} />
              ) : (
                'Submit Feedback'
              )}
            </button>
          )}
        </div>

        <div className="border border-gray-100 rounded-xl p-4 max-w-50">
          <p className="text-blue-900 text-xs font-bold mb-3">
            Special Offer Code
          </p>
          <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl">
            <p className="text-xs text-gray-600">Offer Code</p>
            <input
              className="flex-1 bg-gray-50 border rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#004a61] focus:border-transparent outline-none"
              value={offerCode}
              onChange={(e) => {
                setOfferCode(e.target.value);
                setAppliedOffer(false);
              }}
            />
            <button
              onClick={handleApplyOffer}
              disabled={appliedOffer}
              className={`${
                appliedOffer
                  ? 'bg-green-600 cursor-default'
                  : 'bg-[#004a61] hover:bg-[#003649]'
              } text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-50`}
            >
              {appliedOffer ? 'Applied ✓' : 'Shop Now >'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
