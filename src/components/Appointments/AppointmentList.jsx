import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { usePatient } from '../../contexts/PatientContext';
import AppointmentForm from './AppointmentForm';

const { FiPlus, FiCalendar, FiClock, FiUser, FiEdit, FiTrash2 } = FiIcons;

const AppointmentList = () => {
  const { appointments, loading } = usePatient();
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAddNew = () => {
    setSelectedAppointment(null);
    setShowForm(true);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  };

  const mockAppointments = [
    {
      id: '1',
      patient_name: 'John Doe',
      provider_name: 'Dr. Sarah Johnson',
      appointment_date: '2024-01-15',
      appointment_time: '09:00',
      type: 'Consultation',
      status: 'scheduled',
      notes: 'Regular checkup'
    },
    {
      id: '2',
      patient_name: 'Jane Smith',
      provider_name: 'Dr. Michael Brown',
      appointment_date: '2024-01-15',
      appointment_time: '10:30',
      type: 'Follow-up',
      status: 'confirmed',
      notes: 'Follow-up for treatment'
    }
  ];

  const displayAppointments = appointments.length > 0 ? appointments : mockAppointments;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} className="text-lg" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayAppointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUser} className="text-primary-600" />
                <span className="font-medium text-gray-900">{appointment.patient_name}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {appointment.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiCalendar} />
                <span>{new Date(appointment.appointment_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <SafeIcon icon={FiClock} />
                <span>{appointment.appointment_time}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Provider:</strong> {appointment.provider_name}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Type:</strong> {appointment.type}
              </div>
            </div>

            {appointment.notes && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {appointment.notes}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => handleEdit(appointment)}
                className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiEdit} />
              </button>
              <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                <SafeIcon icon={FiTrash2} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Appointment Form Modal */}
      {showForm && (
        <AppointmentForm
          appointment={selectedAppointment}
          onClose={() => setShowForm(false)}
        />
      )}
    </motion.div>
  );
};

export default AppointmentList;