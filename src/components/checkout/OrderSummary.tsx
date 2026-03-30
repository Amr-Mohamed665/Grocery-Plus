'use client';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderSummaryProps {
  items?: CartItem[];
  subtotal?: number;
  shipping?: number;
  discount?: number;
  total?: number;
}

export function OrderSummary({
  items = [],
  subtotal = 0,
  shipping = 0,
  discount = 0,
  total = 0,
}: OrderSummaryProps) {
  const calculatedSubtotal =
    subtotal || items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const calculatedTotal = calculatedSubtotal + shipping - discount;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>

      {items.length > 0 ? (
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  'IMG'
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold">${item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm mb-6">No items in cart</p>
      )}

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">${calculatedSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Discount</span>
            <span className="font-medium text-green-600">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
          <span>Total</span>
          <span>${calculatedTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
