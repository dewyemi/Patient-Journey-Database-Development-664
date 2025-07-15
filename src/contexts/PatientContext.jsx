import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../database/database';

const PatientContext = createContext();

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [journeySteps, setJourneySteps] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all patients
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('patients').select();
      if (error) throw error;
      setPatients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch journey steps
  const fetchJourneySteps = async () => {
    try {
      const { data, error } = await supabase.from('journey_steps').select();
      if (error) throw error;
      setJourneySteps(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase.from('appointments').select();
      if (error) throw error;
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Create new patient
  const createPatient = async (patientData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('patients').insert(patientData);
      if (error) throw error;
      await fetchPatients();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update patient
  const updatePatient = async (id, patientData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('patients').update(id, patientData);
      if (error) throw error;
      await fetchPatients();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update journey step
  const updateJourneyStep = async (stepId, status) => {
    try {
      const { data, error } = await supabase.from('journey_steps').update(stepId, { status });
      if (error) throw error;
      await fetchJourneySteps();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Create appointment
  const createAppointment = async (appointmentData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('appointments').insert(appointmentData);
      if (error) throw error;
      await fetchAppointments();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchJourneySteps();
    fetchAppointments();
  }, []);

  const value = {
    patients,
    currentPatient,
    setCurrentPatient,
    journeySteps,
    appointments,
    loading,
    error,
    createPatient,
    updatePatient,
    updateJourneyStep,
    createAppointment,
    fetchPatients,
    fetchJourneySteps,
    fetchAppointments
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};