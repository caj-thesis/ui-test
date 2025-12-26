import { PackageCheck, Clock } from 'lucide-react';

interface PickupLockersPageProps {
  onSelectLocker: (lockerId: number) => void;
}

const readyLockers = [
  { id: 6, weight: 8.5, price: 21.25, readyTime: '2 hours ago' },
  { id: 8, weight: 6.0, price: 15.00, readyTime: '5 hours ago' },
  { id: 10, weight: 12.5, price: 31.25, readyTime: '1 day ago' },
  { id: 12, weight: 4.5, price: 11.25, readyTime: '3 hours ago' },
];

export function PickupLockersPage({ onSelectLocker }: PickupLockersPageProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50 p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl text-gray-800 mb-3">Ready for Pickup</h2>
        <p className="text-lg text-gray-600">Select your locker to proceed with payment</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          {readyLockers.map((locker) => (
            <button
              key={locker.id}
              onClick={() => onSelectLocker(locker.id)}
              className="w-full flex items-center justify-between p-6 bg-white rounded-xl shadow hover:shadow-lg transition-all border-2 border-transparent hover:border-green-500"
            >
              <div className="flex items-center space-x-4">
                <PackageCheck size={48} className="text-green-600" />
                <div className="text-left">
                  <div className="text-2xl text-gray-800 mb-1">Locker {locker.id}</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>Ready {locker.readyTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">{locker.weight} kg</div>
                <div className="text-2xl text-green-600">${locker.price.toFixed(2)}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
