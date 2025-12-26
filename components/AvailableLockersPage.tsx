import { Lock } from 'lucide-react';

interface AvailableLockersPageProps {
  onSelectLocker: (lockerId: number) => void;
}

const availableLockers = [
  { id: 1, size: 'Small', capacity: '5 kg' },
  { id: 2, size: 'Small', capacity: '5 kg' },
  { id: 3, size: 'Medium', capacity: '10 kg' },
  { id: 4, size: 'Medium', capacity: '10 kg' },
  { id: 5, size: 'Large', capacity: '15 kg' },
  { id: 7, size: 'Small', capacity: '5 kg' },
  { id: 9, size: 'Large', capacity: '15 kg' },
];

export function AvailableLockersPage({ onSelectLocker }: AvailableLockersPageProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50 p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl text-gray-800 mb-3">Available Lockers</h2>
        <p className="text-lg text-gray-600">Select a locker for your laundry</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {availableLockers.map((locker) => (
            <button
              key={locker.id}
              onClick={() => onSelectLocker(locker.id)}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
            >
              <Lock size={40} className="text-blue-600 mb-3" />
              <div className="text-2xl mb-1">Locker {locker.id}</div>
              <div className="text-lg text-gray-600">{locker.size}</div>
              <div className="text-sm text-gray-500">Max: {locker.capacity}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
