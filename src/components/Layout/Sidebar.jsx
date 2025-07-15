import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';

const {
  FiHome,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiActivity,
  FiBarChart3,
  FiSettings,
  FiChevronLeft,
  FiChevronRight
} = FiIcons;

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/' },
    {
      id: 'patients',
      label: 'Patients',
      icon: FiUsers,
      path: '/patients',
      permission: 'manage_patients'
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: FiCalendar,
      path: '/appointments',
      permission: 'manage_appointments'
    },
    { id: 'journey', label: 'Patient Journey', icon: FiActivity, path: '/journey' },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: FiBarChart3,
      path: '/analytics',
      permission: 'view_analytics'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: FiSettings,
      path: '/settings',
      permission: 'manage_settings'
    }
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  return (
    <motion.div
      className={`bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h2 className="text-lg font-semibold">Navigation</h2>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <SafeIcon
            icon={collapsed ? FiChevronRight : FiChevronLeft}
            className="text-lg"
          />
        </button>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          if (item.permission && !hasPermission(item.permission)) {
            return null;
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-800 transition-colors ${
                activeTab === item.id
                  ? 'bg-gray-800 border-r-2 border-primary-500'
                  : ''
              }`}
            >
              <SafeIcon icon={item.icon} className="text-xl" />
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;