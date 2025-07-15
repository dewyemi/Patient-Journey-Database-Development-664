import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: '1',
    name: 'Dr. Admin',
    email: 'admin@example.com',
    role: 'admin',
    permissions: [
      'manage_patients',
      'manage_appointments',
      'manage_staff',
      'view_analytics',
      'manage_settings'
    ]
  });

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, hasPermission, logout }}>
      {children}
    </AuthContext.Provider>
  );
};