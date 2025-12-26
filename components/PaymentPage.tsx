import { useState } from 'react';
import { CreditCard, Smartphone, DollarSign, Loader2 } from 'lucide-react';

interface PaymentPageProps {
  lockerId: number;
  onComplete: () => void;
}

const lockerData: Record<number, { weight: number; price: number }> = {
  6: { weight: 8.5, price: 21.25 },
  8: { weight: 6.0, price: 15.00 },
  10: { weight: 12.5, price: 31.25 },
  12: { weight: 4.5, price: 11.25 },
};

export function PaymentPage({ lockerId, onComplete }: PaymentPageProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const locker = lockerData[lockerId];

  const handlePayment = (method: 'card' | 'mobile') => {
    setPaymentMethod(method);
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onComplete();
    }, 3000);
  };

  if (processing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-8">
        <Loader2 size={80} className="text-blue-600 animate-spin mb-8" />
        <h2 className="text-4xl text-gray-800 mb-4">Processing Payment...</h2>
        <p className="text-xl text-gray-600">Please wait</p>
      </div>
    );
  }

  if (!paymentMethod) {
    return (
      <div className="h-full flex flex-col bg-gray-50 p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl text-gray-800 mb-3">Payment</h2>
          <p className="text-lg text-gray-600">Locker {lockerId}</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <div className="text-center">
            <div className="text-gray-600 text-xl mb-2">Total Amount</div>
            <div className="text-6xl text-blue-600 mb-4">${locker.price.toFixed(2)}</div>
            <div className="text-gray-500 border-t pt-4">
              Weight: {locker.weight} kg @ $2.50/kg
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-4">
          <button
            onClick={() => handlePayment('card')}
            className="flex items-center justify-center space-x-4 p-8 bg-white rounded-xl shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
          >
            <CreditCard size={48} className="text-blue-600" />
            <div className="text-left">
              <div className="text-2xl text-gray-800">Card Payment</div>
              <p className="text-gray-600">Tap or insert your card</p>
            </div>
          </button>

          <button
            onClick={() => handlePayment('mobile')}
            className="flex items-center justify-center space-x-4 p-8 bg-white rounded-xl shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-green-500"
          >
            <Smartphone size={48} className="text-green-600" />
            <div className="text-left">
              <div className="text-2xl text-gray-800">Mobile Payment</div>
              <p className="text-gray-600">Apple Pay, Google Pay</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="text-center">
        {paymentMethod === 'card' && (
          <>
            <CreditCard size={80} className="text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl text-gray-800 mb-4">Insert or Tap Card</h2>
            <p className="text-xl text-gray-600">Amount: ${locker.price.toFixed(2)}</p>
          </>
        )}
        {paymentMethod === 'mobile' && (
          <>
            <Smartphone size={80} className="text-green-600 mx-auto mb-6" />
            <h2 className="text-4xl text-gray-800 mb-4">Hold Phone Near Reader</h2>
            <p className="text-xl text-gray-600">Amount: ${locker.price.toFixed(2)}</p>
          </>
        )}
      </div>
    </div>
  );
}
