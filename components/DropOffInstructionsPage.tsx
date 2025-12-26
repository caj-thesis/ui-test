import { useState, useEffect } from 'react';
import { Scale, DollarSign, Loader2 } from 'lucide-react';

interface DropOffInstructionsPageProps {
  lockerId: number;
  onComplete: () => void;
}

export function DropOffInstructionsPage({ lockerId, onComplete }: DropOffInstructionsPageProps) {
  const [step, setStep] = useState<'instructions' | 'weighing' | 'summary'>('instructions');
  const [weight, setWeight] = useState(0);
  const [isWeighing, setIsWeighing] = useState(false);
  
  const pricePerKg = 2.50;
  const totalPrice = weight * pricePerKg;

  const handleOpenLocker = () => {
    setStep('weighing');
    setIsWeighing(true);
    
    // Simulate locker opening and weight detection
    setTimeout(() => {
      // Simulate gradual weight increase
      let currentWeight = 0;
      const interval = setInterval(() => {
        currentWeight += 0.5;
        setWeight(parseFloat(currentWeight.toFixed(1)));
        
        if (currentWeight >= 7.5) {
          clearInterval(interval);
          setIsWeighing(false);
          setTimeout(() => {
            setStep('summary');
          }, 1000);
        }
      }, 300);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 p-8">
      {step === 'instructions' && (
        <>
          <div className="text-center mb-8">
            <h2 className="text-4xl text-gray-800 mb-3">Locker {lockerId}</h2>
            <p className="text-lg text-gray-600">Drop Off Instructions</p>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  1
                </div>
                <div>
                  <div className="text-xl mb-2">Open the locker</div>
                  <p className="text-gray-600">Press the button below to unlock locker {lockerId}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  2
                </div>
                <div>
                  <div className="text-xl mb-2">Place your laundry</div>
                  <p className="text-gray-600">Put your laundry items inside the locker</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xl">
                  3
                </div>
                <div>
                  <div className="text-xl mb-2">Close the door</div>
                  <p className="text-gray-600">The system will automatically weigh and calculate the price</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenLocker}
            className="w-full py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-2xl shadow-lg"
          >
            Open Locker {lockerId}
          </button>
        </>
      )}

      {step === 'weighing' && (
        <div className="h-full flex flex-col items-center justify-center">
          <Scale size={80} className="text-blue-600 mb-8 animate-bounce" />
          <h2 className="text-4xl text-gray-800 mb-4">Weighing...</h2>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 w-full">
            <div className="text-center">
              <div className="text-gray-600 text-xl mb-2">Current Weight</div>
              <div className="text-6xl text-blue-600 mb-4">{weight} <span className="text-3xl">kg</span></div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-center space-x-2 text-gray-600 text-xl">
                  <DollarSign size={24} />
                  <span>Estimated: ${totalPrice.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">${pricePerKg.toFixed(2)} per kg</div>
              </div>
            </div>
          </div>

          {isWeighing && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Loader2 className="animate-spin" size={20} />
              <span>Please close the locker door...</span>
            </div>
          )}
        </div>
      )}

      {step === 'summary' && (
        <div className="h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl text-gray-800 mb-3">Drop Off Summary</h2>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-6">
                <div className="text-gray-600 text-xl mb-2">Total Weight</div>
                <div className="text-5xl text-blue-600">{weight} kg</div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex justify-between text-xl mb-3">
                  <span className="text-gray-600">Price per kg:</span>
                  <span>${pricePerKg.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <p className="text-center text-gray-700">
                Your laundry will be processed and ready for pickup in approximately <span className="text-blue-600">24 hours</span>
              </p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-2xl shadow-lg"
          >
            Confirm Drop Off
          </button>
        </div>
      )}
    </div>
  );
}
