import React from 'react';
import { motion } from 'framer-motion';

const JourneyProgress = ({ steps }) => {
  const totalSteps = steps.length;
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const inProgressSteps = steps.filter(step => step.status === 'in_progress').length;
  const pendingSteps = steps.filter(step => step.status === 'pending').length;

  const completionPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Journey Progress</h3>
        <span className="text-sm text-gray-500">
          {completedSteps} of {totalSteps} completed
        </span>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{completedSteps}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{inProgressSteps}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{pendingSteps}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>
    </motion.div>
  );
};

export default JourneyProgress;