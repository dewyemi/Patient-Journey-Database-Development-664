import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { useAuth } from '../../contexts/AuthContext';

const { FiActivity, FiUser, FiBell, FiSettings, FiLogOut } = FiIcons;

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiActivity} className="text-2xl text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">EmirAfrik Health</h1>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-gray-500">
              Patient Journey Management
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <SafeIcon icon={FiBell} className="text-xl" />
          </button>
          {user?.role === 'admin' && (
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <SafeIcon icon={FiSettings} className="text-xl" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="text-white text-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiLogOut} className="text-xl" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;