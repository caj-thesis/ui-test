import { PackagePlus, PackageCheck } from 'lucide-react';

interface ProcessSelectionPageProps {
  onSelect: (process: 'dropoff' | 'pickup') => void;
}

export function ProcessSelectionPage({ onSelect }: ProcessSelectionPageProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50 p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-gray-800 mb-3">Select Service</h2>
        <p className="text-xl text-gray-600">What would you like to do?</p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        <button
          onClick={() => onSelect('dropoff')}
          className="flex items-center justify-center space-x-6 p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500"
        >
          <PackagePlus size={64} className="text-blue-600" strokeWidth={1.5} />
          <div className="text-left">
            <div className="text-3xl text-gray-800 mb-2">Drop Off</div>
            <p className="text-lg text-gray-600">Place your laundry</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('pickup')}
          className="flex items-center justify-center space-x-6 p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
        >
          <PackageCheck size={64} className="text-green-600" strokeWidth={1.5} />
          <div className="text-left">
            <div className="text-3xl text-gray-800 mb-2">Pick Up</div>
            <p className="text-lg text-gray-600">Collect your laundry</p>
          </div>
        </button>
      </div>
    </div>
  );
}
