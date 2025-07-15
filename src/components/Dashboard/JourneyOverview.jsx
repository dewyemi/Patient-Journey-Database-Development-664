import React from 'react';
import { motion } from 'framer-motion';
import { usePatient } from '../../contexts/PatientContext';

const JourneyOverview = () => {
  const { journeySteps } = usePatient();

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStepTextColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700';
      case 'in_progress':
        return 'text-blue-700';
      case 'pending':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Journey Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {journeySteps.slice(0, 8).map((step, index) => (
          <motion.div
            key={step.id}
            className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className={`w-3 h-3 rounded-full ${getStepColor(step.status)}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{step.title}</p>
              <p className={`text-xs capitalize ${getStepTextColor(step.status)}`}>
                {step.status.replace('_', ' ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full" />
            <span className="text-sm text-gray-600">Pending</span>
          </div>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View all steps
        </button>
      </div>
    </motion.div>
  );
};

export default JourneyOverview;