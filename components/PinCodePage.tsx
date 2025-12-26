import { useState } from 'react';
import { Lock, Delete, AlertCircle } from 'lucide-react';

interface PinCodePageProps {
  lockerId: number;
  onVerified: () => void;
}

// Mock PIN codes for each locker (in real app, this would be verified server-side)
const lockerPins: Record<number, string> = {
  6: '1234',
  8: '5678',
  10: '9012',
  12: '3456',
};

export function PinCodePage({ lockerId, onVerified }: PinCodePageProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      // Auto-verify when 4 digits are entered
      if (newPin.length === 4) {
        setTimeout(() => {
          if (newPin === lockerPins[lockerId]) {
            onVerified();
          } else {
            setError(true);
            setTimeout(() => {
              setPin('');
              setError(false);
            }, 1500);
          }
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 p-8">
      <div className="text-center mb-8">
        <Lock size={64} className="text-blue-600 mx-auto mb-4" />
        <h2 className="text-4xl text-gray-800 mb-3">Enter PIN Code</h2>
        <p className="text-lg text-gray-600">Locker {lockerId}</p>
        <p className="text-sm text-gray-500 mt-2">(Demo PIN: {lockerPins[lockerId]})</p>
      </div>

      {/* PIN Display */}
      <div className="mb-8">
        <div className="flex justify-center space-x-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${
                error
                  ? 'bg-red-100 border-2 border-red-400'
                  : pin.length > i
                  ? 'bg-blue-600 text-white border-2 border-blue-600'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              {pin.length > i && '•'}
            </div>
          ))}
        </div>
        
        {error && (
          <div className="flex items-center justify-center space-x-2 text-red-600 mt-4">
            <AlertCircle size={20} />
            <span>Incorrect PIN. Please try again.</span>
          </div>
        )}
      </div>

      {/* Number Pad */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={pin.length >= 4}
              className="h-20 bg-white rounded-xl shadow hover:shadow-lg transition-all text-3xl text-gray-800 hover:bg-gray-50 active:scale-95 disabled:opacity-50"
            >
              {num}
            </button>
          ))}
          
          <button
            onClick={handleClear}
            className="h-20 bg-white rounded-xl shadow hover:shadow-lg transition-all text-xl text-gray-600 hover:bg-gray-50 active:scale-95"
          >
            Clear
          </button>
          
          <button
            onClick={() => handleNumberClick('0')}
            disabled={pin.length >= 4}
            className="h-20 bg-white rounded-xl shadow hover:shadow-lg transition-all text-3xl text-gray-800 hover:bg-gray-50 active:scale-95 disabled:opacity-50"
          >
            0
          </button>
          
          <button
            onClick={handleDelete}
            className="h-20 bg-white rounded-xl shadow hover:shadow-lg transition-all text-gray-600 hover:bg-gray-50 active:scale-95 flex items-center justify-center"
          >
            <Delete size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
