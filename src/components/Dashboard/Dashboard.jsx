import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { usePatient } from '../../contexts/PatientContext';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import JourneyOverview from './JourneyOverview';

const { FiUsers, FiCalendar, FiActivity, FiTrendingUp } = FiIcons;

const Dashboard = () => {
  const { patients, appointments, journeySteps } = usePatient();

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: FiUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Today\'s Appointments',
      value: appointments.length,
      icon: FiCalendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Active Journeys',
      value: journeySteps.filter(step => step.status === 'in_progress').length,
      icon: FiActivity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Completion Rate',
      value: '94%',
      icon: FiTrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+2%',
      changeType: 'increase'
    }
  ];

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <JourneyOverview />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;