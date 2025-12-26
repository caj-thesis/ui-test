import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ThankYouPageProps {
  processType: 'dropoff' | 'pickup';
  onReset: () => void;
}

export function ThankYouPage({ processType, onReset }: ThankYouPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onReset]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-green-600 text-white p-8">
      <CheckCircle size={120} strokeWidth={1.5} className="mb-8" />
      
      <h1 className="text-5xl mb-4">Thank You!</h1>
      
      {processType === 'dropoff' && (
        <div className="text-center space-y-4">
          <p className="text-2xl opacity-90">Your laundry has been received</p>
          <p className="text-xl opacity-75">We'll have it ready for you in 24 hours</p>
        </div>
      )}
      
      {processType === 'pickup' && (
        <div className="text-center space-y-4">
          <p className="text-2xl opacity-90">Payment successful!</p>
          <p className="text-xl opacity-75">Your locker is now open. Please collect your items.</p>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-lg opacity-75">Returning to home screen...</p>
      </div>
    </div>
  );
}
