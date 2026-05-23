import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const colors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    error: FiAlertCircle,
    success: FiCheckCircle,
    info: FiAlertCircle,
  };

  const Icon = icons[type];

  return (
    <div className={`border rounded-lg p-4 ${colors[type]} flex items-start justify-between`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 flex-shrink-0" />
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0">
          <FiX />
        </button>
      )}
    </div>
  );
}
