import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { ProcessSelectionPage } from './components/ProcessSelectionPage';
import { AvailableLockersPage } from './components/AvailableLockersPage';
import { DropOffInstructionsPage } from './components/DropOffInstructionsPage';
import { PickupLockersPage } from './components/PickupLockersPage';
import { PinCodePage } from './components/PinCodePage';
import { PaymentPage } from './components/PaymentPage';
import { ThankYouPage } from './components/ThankYouPage';

type Screen = 
  | 'welcome'
  | 'process-selection'
  | 'available-lockers'
  | 'dropoff-instructions'
  | 'pickup-lockers'
  | 'pin-entry'
  | 'payment'
  | 'thank-you';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedLocker, setSelectedLocker] = useState<number | null>(null);
  const [processType, setProcessType] = useState<'dropoff' | 'pickup' | null>(null);

  const handleWelcomeNext = () => {
    setCurrentScreen('process-selection');
  };

  const handleProcessSelection = (process: 'dropoff' | 'pickup') => {
    setProcessType(process);
    if (process === 'dropoff') {
      setCurrentScreen('available-lockers');
    } else {
      setCurrentScreen('pickup-lockers');
    }
  };

  const handleLockerSelect = (lockerId: number) => {
    setSelectedLocker(lockerId);
    setCurrentScreen('dropoff-instructions');
  };

  const handleDropOffComplete = () => {
    setCurrentScreen('thank-you');
  };

  const handlePickupLockerSelect = (lockerId: number) => {
    setSelectedLocker(lockerId);
    setCurrentScreen('pin-entry');
  };

  const handlePinVerified = () => {
    setCurrentScreen('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentScreen('thank-you');
  };

  const handleReset = () => {
    setCurrentScreen('welcome');
    setSelectedLocker(null);
    setProcessType(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[480px] h-[800px] bg-white shadow-2xl overflow-hidden relative">
        {currentScreen === 'welcome' && (
          <WelcomePage onNext={handleWelcomeNext} />
        )}
        {currentScreen === 'process-selection' && (
          <ProcessSelectionPage onSelect={handleProcessSelection} />
        )}
        {currentScreen === 'available-lockers' && (
          <AvailableLockersPage onSelectLocker={handleLockerSelect} />
        )}
        {currentScreen === 'dropoff-instructions' && selectedLocker && (
          <DropOffInstructionsPage 
            lockerId={selectedLocker} 
            onComplete={handleDropOffComplete}
          />
        )}
        {currentScreen === 'pickup-lockers' && (
          <PickupLockersPage onSelectLocker={handlePickupLockerSelect} />
        )}
        {currentScreen === 'pin-entry' && selectedLocker && (
          <PinCodePage 
            lockerId={selectedLocker}
            onVerified={handlePinVerified}
          />
        )}
        {currentScreen === 'payment' && selectedLocker && (
          <PaymentPage 
            lockerId={selectedLocker}
            onComplete={handlePaymentComplete}
          />
        )}
        {currentScreen === 'thank-you' && (
          <ThankYouPage 
            processType={processType!}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}