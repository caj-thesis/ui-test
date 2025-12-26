import { useState } from 'react';
import { Scale, DollarSign, Loader2, AlertCircle } from 'lucide-react';

interface DropOffInstructionsPageProps {
  lockerId: number;
  onComplete: () => void;
}

export function DropOffInstructionsPage({ lockerId, onComplete }: DropOffInstructionsPageProps) {
  const [step, setStep] = useState<'instructions' | 'weighing' | 'summary'>('instructions');
  const [weight, setWeight] = useState(0); // Manual weight control
  const [isDoorClosed, setIsDoorClosed] = useState(true); // Manual door state
  const [isProcessing, setIsProcessing] = useState(false);
  
  const pricePerKg = 2.50;
  const totalPrice = weight * pricePerKg;

  // --- SIMULATION CONTROLS ---
  const startSimulation = () => {
    setStep('weighing');
    setIsDoorClosed(false); // Simulate door opening
  };

  const simulateDoorClose = () => {
    setIsDoorClosed(true);
    setIsProcessing(true);
    // Fake a short processing delay
    setTimeout(() => {
        setIsProcessing(false);
        setStep('summary');
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 p-8 relative">
      
      {/* 1. INSTRUCTIONS VIEW */}
      {step === 'instructions' && (
        <>
          <div className="text-center mb-8">
            <h2 className="text-4xl text-gray-800 mb-3">Locker {lockerId}</h2>
            <p className="text-lg text-gray-600">Drop Off Instructions</p>
          </div>

          <div className="flex-1 space-y-4">
             {/* Simple Instruction Cards */}
             <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">1</div>
                <div><div className="font-semibold text-lg">Open Locker</div><div className="text-gray-500">Click button below</div></div>
             </div>
             <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">2</div>
                <div><div className="font-semibold text-lg">Place Laundry</div><div className="text-gray-500">Put items inside</div></div>
             </div>
          </div>

          <button
            onClick={startSimulation}
            className="w-full py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-2xl shadow-lg mt-8"
          >
            Open Locker {lockerId}
          </button>
        </>
      )}

      {/* 2. WEIGHING VIEW */}
      {step === 'weighing' && (
        <div className="h-full flex flex-col items-center justify-center">
          <Scale size={80} className={`text-blue-600 mb-8 ${!isDoorClosed ? 'animate-bounce' : ''}`} />
          
          <h2 className="text-4xl text-gray-800 mb-4">
            {!isDoorClosed ? "Waiting for items..." : "Calculating..."}
          </h2>
          
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8 w-full text-center">
              <div className="text-gray-600 text-xl mb-2">Current Weight</div>
              {/* This updates instantly as you drag the slider */}
              <div className="text-6xl text-blue-600 mb-4 font-mono">{weight.toFixed(2)} <span className="text-3xl">kg</span></div>
              
              <div className="border-t pt-4 flex justify-center items-center gap-2 text-xl text-gray-600">
                  <DollarSign size={24} />
                  <span>Est: ${totalPrice.toFixed(2)}</span>
              </div>
          </div>

          {!isDoorClosed && (
            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-6 py-3 rounded-full border border-amber-200">
              <AlertCircle size={20} />
              <span>Door is OPEN. Place items and close door.</span>
            </div>
          )}

          {isProcessing && (
             <div className="flex items-center gap-2 text-blue-600 mt-4">
                 <Loader2 className="animate-spin" /> Finalizing...
             </div>
          )}
        </div>
      )}

      {/* 3. SUMMARY VIEW */}
      {step === 'summary' && (
        <div className="h-full flex flex-col">
          <div className="text-center mb-8">
            <h2 className="text-4xl text-gray-800 mb-3">Drop Off Summary</h2>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg flex-1 mb-8">
              <div className="text-center mb-8">
                  <div className="text-gray-500 text-lg uppercase tracking-wide">Final Weight</div>
                  <div className="text-6xl font-bold text-blue-600">{weight.toFixed(2)} kg</div>
              </div>
              <div className="border-t pt-6 flex justify-between items-center">
                  <span className="text-2xl text-gray-700">Total Due</span>
                  <span className="text-4xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-6 bg-green-600 text-white rounded-xl hover:bg-green-700 text-2xl shadow-lg"
          >
            Confirm & Pay
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 🛠️ SIMULATION PANEL (Only visible during UI testing)           */}
      {/* ============================================================== */}
      <div className="absolute bottom-4 right-4 w-64 bg-slate-900 text-white p-4 rounded-lg shadow-2xl border border-slate-700 opacity-90">
        <div className="text-xs font-bold text-slate-400 uppercase mb-2 border-b border-slate-700 pb-1">
            Hardware Simulator
        </div>
        
        {/* Weight Slider */}
        <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
                <span>Load Cell (kg)</span>
                <span className="font-mono text-yellow-400">{weight.toFixed(2)}</span>
            </div>
            <input 
                type="range" 
                min="0" max="15" step="0.1" 
                value={weight} 
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
        </div>

        {/* Door Toggle */}
        <div className="flex justify-between items-center">
            <span className="text-xs">Door Status:</span>
            {isDoorClosed ? (
                <span className="text-green-400 text-xs font-bold px-2 py-1 bg-green-900/30 rounded">CLOSED</span>
            ) : (
                <button 
                    onClick={simulateDoorClose}
                    className="bg-red-600 hover:bg-red-500 text-xs text-white px-3 py-1 rounded transition"
                >
                    CLOSE DOOR
                </button>
            )}
        </div>
      </div>
    </div>
  );
}