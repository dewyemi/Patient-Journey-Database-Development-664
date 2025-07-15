import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './contexts/PatientContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import PatientList from './components/Patients/PatientList';
import AppointmentList from './components/Appointments/AppointmentList';
import PatientJourney from './components/Journey/PatientJourney';
import Analytics from './components/Analytics/Analytics';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Router>
      <AuthProvider>
        <PatientProvider>
          <div className="min-h-screen bg-gray-50">
            <div className="flex h-screen">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                      path="/patients"
                      element={
                        <ProtectedRoute requiredPermission="manage_patients">
                          <PatientList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/appointments"
                      element={
                        <ProtectedRoute requiredPermission="manage_appointments">
                          <AppointmentList />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/journey" element={<PatientJourney />} />
                    <Route
                      path="/analytics"
                      element={
                        <ProtectedRoute requiredPermission="view_analytics">
                          <Analytics />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/unauthorized"
                      element={
                        <div className="p-6">
                          <h1 className="text-2xl font-bold text-red-600">
                            Unauthorized Access
                          </h1>
                          <p className="mt-2 text-gray-600">
                            You don't have permission to access this resource.
                          </p>
                        </div>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        </PatientProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;