import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { usePatient } from '../../contexts/PatientContext';
import JourneyStep from './JourneyStep';
import JourneyProgress from './JourneyProgress';

const { FiFilter, FiRefreshCw } = FiIcons;

const PatientJourney = () => {
  const { journeySteps, updateJourneyStep, fetchJourneySteps } = usePatient();
  const [filter, setFilter] = useState('all');

  const filteredSteps = journeySteps.filter(step => {
    if (filter === 'all') return true;
    return step.status === filter;
  });

  const handleStepUpdate = async (stepId, newStatus) => {
    try {
      await updateJourneyStep(stepId, newStatus);
    } catch (error) {
      console.error('Error updating step:', error);
    }
  };

  const handleRefresh = () => {
    fetchJourneySteps();
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patient Journey</h1>
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Steps</option>
            <option value="completed">Completed</option>
            <option value="in_progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiRefreshCw} className="text-lg" />
          </button>
        </div>
      </div>

      <JourneyProgress steps={journeySteps} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSteps.map((step, index) => (
          <JourneyStep
            key={step.id}
            step={step}
            index={index}
            onUpdate={handleStepUpdate}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default PatientJourney;