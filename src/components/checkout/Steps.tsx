'use client';

import { Check } from 'lucide-react';

interface StepsProps {
  currentStep?: number;
}

const STEPS = [
  { id: 1, label: 'Delivery Address' },
  { id: 2, label: 'Payment Method' },
  { id: 3, label: 'Order Confirmation' },
];

export function Steps({ currentStep = 2 }: StepsProps) {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCompleted
                      ? 'bg-[#004a61] text-white'
                      : isActive
                      ? 'bg-[#004a61] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : step.id}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    isActive || isCompleted ? 'text-[#004a61]' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-[#004a61]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
