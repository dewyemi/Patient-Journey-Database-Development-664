import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUser, FiCalendar, FiFileText, FiActivity } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'patient_registered',
      message: 'New patient John Doe registered',
      time: '2 minutes ago',
      icon: FiUser,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'appointment_scheduled',
      message: 'Appointment scheduled for Sarah Johnson',
      time: '15 minutes ago',
      icon: FiCalendar,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'journey_completed',
      message: 'Patient journey completed for Mike Wilson',
      time: '1 hour ago',
      icon: FiActivity,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'record_updated',
      message: 'Medical record updated for Emma Davis',
      time: '2 hours ago',
      icon: FiFileText,
      color: 'text-orange-600'
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            className="flex items-start space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: activity.id * 0.1 }}
          >
            <div className="flex-shrink-0">
              <SafeIcon icon={activity.icon} className={`text-lg ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
        View all activity
      </button>
    </motion.div>
  );
};

export default RecentActivity;