import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { usePatient } from '../../contexts/PatientContext';
import AnalyticsChart from './AnalyticsChart';
import MetricsCard from './MetricsCard';

const { FiTrendingUp, FiUsers, FiClock, FiActivity } = FiIcons;

const Analytics = () => {
  const { patients, journeySteps, appointments } = usePatient();

  const metrics = [
    {
      title: 'Patient Satisfaction',
      value: '94%',
      change: '+2.5%',
      changeType: 'increase',
      icon: FiTrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Average Wait Time',
      value: '12 min',
      change: '-3 min',
      changeType: 'decrease',
      icon: FiClock,
      color: 'text-blue-600'
    },
    {
      title: 'Journey Completion',
      value: '87%',
      change: '+5%',
      changeType: 'increase',
      icon: FiActivity,
      color: 'text-purple-600'
    },
    {
      title: 'Patient Volume',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: FiUsers,
      color: 'text-orange-600'
    }
  ];

  const chartData = [
    { month: 'Jan', patients: 120, completed: 110, satisfaction: 92 },
    { month: 'Feb', patients: 140, completed: 128, satisfaction: 91 },
    { month: 'Mar', patients: 160, completed: 145, satisfaction: 93 },
    { month: 'Apr', patients: 180, completed: 162, satisfaction: 94 },
    { month: 'May', patients: 200, completed: 185, satisfaction: 95 },
    { month: 'Jun', patients: 220, completed: 205, satisfaction: 94 }
  ];

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricsCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Patient Journey Trends"
          data={chartData}
          type="line"
        />
        <AnalyticsChart
          title="Journey Step Analysis"
          data={journeySteps.map(step => ({
            name: step.title,
            value: step.status === 'completed' ? 100 : step.status === 'in_progress' ? 60 : 20
          }))}
          type="bar"
        />
      </div>

      {/* Journey Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Step Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Step</th>
                <th className="text-left py-3 px-4">Average Time</th>
                <th className="text-left py-3 px-4">Completion Rate</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {journeySteps.slice(0, 10).map((step, index) => (
                <tr key={step.id} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{step.title}</td>
                  <td className="py-3 px-4 text-gray-600">{Math.floor(Math.random() * 30) + 5} min</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{Math.floor(Math.random() * 40) + 60}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      step.status === 'completed' ? 'bg-green-100 text-green-800' :
                      step.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {step.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;