'use client';

import { useState } from 'react';
import { ShieldCheck, Wallet, Loader2 } from 'lucide-react';
import { BsCashCoin } from 'react-icons/bs';
import { FaApplePay, FaGooglePay } from 'react-icons/fa';

interface CardOptionProps {
  id: string;
  label: string;
  sub?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

interface MethodBadgeProps {
  label: string;
  sub?: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

interface SavedCard {
  id: string;
  brand?: string;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
}

interface PaymentMethodsProps {
  savedCards?: SavedCard[];
  selectedMethod: string;
  billingSameAsDelivery: boolean;
  onPaymentMethodChange: (method: 'card' | 'cash_on_delivery', id?: string) => void;
  onBillingSameChange: (same: boolean) => void;
  onAddCard?: (card: {
    cardholderName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => Promise<void>;
  cardsLoading?: boolean;
  hasShippingAddress?: boolean;
}

export function PaymentMethods({
  savedCards = [],
  selectedMethod,
  billingSameAsDelivery,
  onPaymentMethodChange,
  onBillingSameChange,
  onAddCard,
  cardsLoading = false,
  hasShippingAddress = false,
}: PaymentMethodsProps) {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  return (
    <section className="bg-white border border-dashed p-8 rounded-3xl shadow-sm mb-8">
      <h3 className="text-xl font-bold mb-6">Payment Method</h3>

      <div className="bg-gray-100/80 p-4 rounded-xl flex items-start gap-3 mb-8 border-r-8 border-gray-300 relative overflow-hidden">
        <ShieldCheck className="text-[#004a61] shrink-0" size={20} />
        <div>
          <p className="text-[#004a61] font-semibold text-lg">
            Secure Checkout
          </p>
          <p className="text-gray-500 text-base mt-1">
            Your information is encrypted and secure. We never store your full
            card details.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-300 translate-x-4 translate-y-4 rotate-45" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        <div className="flex flex-col">
          <div className="border border-black rounded-xl p-4 flex-1">
            <h4 className="font-bold text-2xl text-gray-700 mb-4 underline">Saved Cards</h4>
            {cardsLoading ? (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="animate-spin" size={20} />
                <span className="text-lg">Loading cards...</span>
              </div>
            ) : savedCards.length > 0 ? (
              savedCards.map((card) => {
                const cardId = card.id || `card_${card.last4}`;
                const label = card.brand
                  ? `${card.brand} •••• ${card.last4 ?? '****'}`
                  : `Card •••• ${card.last4 ?? '****'}`;
                const sub =
                  card.exp_month && card.exp_year
                    ? `Expires ${card.exp_month}/${card.exp_year}`
                    : '';
                return (
                  <CardOption
                    key={cardId}
                    id={cardId}
                    label={label}
                    sub={sub}
                    icon={card.brand}
                    selected={selectedMethod === cardId}
                    onClick={() => onPaymentMethodChange('card', cardId)}
                  />
                );
              })
            ) : (
              <p className="text-gray-500 text-lg mb-4">
                No saved cards. Add one below.
              </p>
            )}

            {isAddCardOpen ? (
              <AddCardForm
                onSuccess={() => setIsAddCardOpen(false)}
                onSubmit={onAddCard}
              />
            ) : (
              <button
                onClick={() => setIsAddCardOpen(true)}
                className="text-[#004a61] text-lg font-medium flex items-center gap-2 px-2 hover:underline mb-4"
              >
                <span className="text-2xl">+</span> Add New Card
              </button>
            )}

            <div className="border-t border-gray-200 pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={billingSameAsDelivery}
                  onChange={(e) => onBillingSameChange(e.target.checked)}
                  disabled={!hasShippingAddress}
                  className="w-4 h-4 rounded border-gray-300 text-[#004a61] focus:ring-[#004a61] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-lg text-gray-600">
                  Billing address same as delivery
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border border-black rounded-xl p-4 flex-1">
            <h4 className="font-bold text-2xl text-gray-700 mb-4 underline">Other Payment Methods</h4>
            <div className="grid grid-cols-1 gap-3">
              <MethodBadge
                label="Cash on Delivery"
                sub="Pay when you receive"
                icon={<BsCashCoin size={20} />}
                selected={selectedMethod === 'cash'}
                onClick={() => onPaymentMethodChange('cash_on_delivery')}
              />
              <MethodBadge
                label="Apple Pay"
                sub="Quick checkout with Apple Pay"
                icon={<FaApplePay size={30} />}
                selected={false}
                onClick={() => {}}
              />
              <MethodBadge
                label="Google Pay"
                sub="Quick checkout with Google Pay"
                icon={<FaGooglePay size={30} />}
                selected={false}
                onClick={() => {}}
              />
              <MethodBadge
                label="Wallet Pay"
                sub="Digital wallet payment"
                icon={<Wallet size={18} />}
                selected={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AddCardForm({
  onSuccess,
  onSubmit,
}: {
  onSuccess: () => void;
  onSubmit?: (card: {
    cardholderName: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => Promise<void>;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!cardNumber || !expiry || !cvc || !cardholderName) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit({ cardholderName, cardNumber, expiry, cvc });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      onSuccess();
    } catch {
      setError('Failed to add card. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-gray-200 rounded-xl p-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Cardholder Name
        </label>
        <input
          placeholder="John Doe"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#004a61] focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Card Number
        </label>
        <input
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          maxLength={19}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#004a61] focus:border-transparent outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Expiry Date
          </label>
          <input
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            maxLength={5}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#004a61] focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            CVC
          </label>
          <input
            placeholder="123"
            value={cvc}
            onChange={(e) =>
              setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))
            }
            maxLength={4}
            type="password"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#004a61] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onSuccess}
          className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-[#004a61] text-white rounded-lg text-sm font-medium hover:bg-[#003649] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin inline mr-2" size={16} />
              Adding...
            </>
          ) : (
            'Add Card'
          )}
        </button>
      </div>
    </form>
  );
}

const CardOption = ({
  label,
  sub,
  selected,
  onClick,
  icon,
}: CardOptionProps) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
      selected
        ? 'border-[#004a61] bg-blue-50/20'
        : 'border-gray-100 bg-white hover:border-gray-200'
    }`}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-12 h-8 bg-gray-50 rounded flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <p className="text-lg font-bold">{label}</p>
          <p className="text-sm text-gray-400">{sub}</p>
        </div>
      </div>

      <div
        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
          selected ? 'border-[#004a61]' : 'border-gray-300'
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-[#004a61]" />}
      </div>
    </div>
  </div>
);

const MethodBadge = ({
  label,
  sub,
  icon,
  selected,
  onClick,
}: MethodBadgeProps) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-4 p-3 border rounded-xl cursor-pointer transition-all ${
      selected
        ? 'border-[#004a61] bg-blue-50/20'
        : 'border-gray-100 hover:bg-gray-50 hover:border-gray-200'
    }`}
  >
    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-green-700">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-base font-bold">{label}</p>
      <p className="text-sm text-gray-400">{sub}</p>
    </div>
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
        selected ? 'border-[#004a61]' : 'border-gray-300'
      }`}
    >
      {selected && <div className="w-2 h-2 rounded-full bg-[#004a61]" />}
    </div>
  </div>
);
