import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCheck, FiClock, FiPlay, FiPause } = FiIcons;

const JourneyStep = ({ step, index, onUpdate }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return FiCheck;
      case 'in_progress':
        return FiPlay;
      case 'pending':
        return FiClock;
      default:
        return FiClock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in_progress':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-gray-300 text-gray-600';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  const getCardColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'in_progress':
        return 'border-blue-200 bg-blue-50';
      case 'pending':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(step.id, newStatus);
  };

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-sm border-2 ${getCardColor(step.status)} p-4 hover:shadow-md transition-shadow`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
            <SafeIcon icon={getStatusIcon(step.status)} className="text-sm" />
          </div>
          <span className="text-sm font-medium text-gray-600">
            Step {step.step_number}
          </span>
        </div>
        <div className="relative">
          <select
            value={step.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-2">
        {step.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        {step.description}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded-full capitalize ${
          step.status === 'completed' ? 'bg-green-100 text-green-800' :
          step.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {step.status.replace('_', ' ')}
        </span>
        
        <div className="flex items-center space-x-1">
          {step.status === 'pending' && (
            <button
              onClick={() => handleStatusChange('in_progress')}
              className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
              title="Start"
            >
              <SafeIcon icon={FiPlay} className="text-sm" />
            </button>
          )}
          {step.status === 'in_progress' && (
            <button
              onClick={() => handleStatusChange('completed')}
              className="p-1 text-green-600 hover:text-green-800 transition-colors"
              title="Complete"
            >
              <SafeIcon icon={FiCheck} className="text-sm" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyStep;