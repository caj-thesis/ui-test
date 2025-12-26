import { Package } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
}

export function WelcomePage({ onNext }: WelcomePageProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-600 text-white p-8">
      <div className="flex flex-col items-center space-y-8">
        <Package size={120} strokeWidth={1.5} />
        <div className="text-center space-y-4">
          <h1 className="text-5xl">Welcome</h1>
          <p className="text-xl opacity-90">Smart Laundry Locker System</p>
        </div>
      </div>
      
      <button
        onClick={onNext}
        className="mt-16 px-16 py-6 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors text-2xl shadow-lg"
      >
        Get Started
      </button>
    </div>
  );
}
