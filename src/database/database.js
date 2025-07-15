import { createClient } from '@supabase/supabase-js';

// Mock Supabase client for development
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

// Create a mock database for demonstration
class MockDatabase {
  constructor() {
    this.data = {
      patients: [],
      appointments: [],
      medical_records: [],
      prescriptions: [],
      lab_results: [],
      billing: [],
      insurance: [],
      providers: [],
      departments: [],
      journey_steps: [],
      notifications: [],
      documents: [],
      feedback: [],
      analytics: []
    };
    this.initializeData();
  }

  initializeData() {
    // Initialize with sample data
    this.data.patients = [
      {
        id: '1',
        patient_id: 'P001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890',
        date_of_birth: '1985-06-15',
        gender: 'Male',
        address: '123 Main St, City, State 12345',
        emergency_contact: 'Jane Doe - +1234567891',
        insurance_id: 'INS001',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active'
      }
    ];

    this.data.providers = [
      {
        id: '1',
        provider_id: 'DR001',
        first_name: 'Dr. Sarah',
        last_name: 'Johnson',
        specialization: 'Cardiology',
        department_id: 'DEPT001',
        email: 'dr.johnson@hospital.com',
        phone: '+1234567892',
        schedule: '9:00 AM - 5:00 PM',
        status: 'active'
      }
    ];

    this.data.departments = [
      {
        id: '1',
        department_id: 'DEPT001',
        name: 'Cardiology',
        description: 'Heart and cardiovascular care',
        location: 'Floor 3, Wing A',
        phone: '+1234567893',
        head_of_department: 'DR001'
      }
    ];

    this.data.journey_steps = [
      { id: '1', step_number: 1, title: 'Registration', description: 'Patient registration and check-in', status: 'completed' },
      { id: '2', step_number: 2, title: 'Insurance Verification', description: 'Verify insurance coverage', status: 'in_progress' },
      { id: '3', step_number: 3, title: 'Triage', description: 'Initial assessment and prioritization', status: 'pending' },
      { id: '4', step_number: 4, title: 'Vitals Check', description: 'Record vital signs', status: 'pending' },
      { id: '5', step_number: 5, title: 'Consultation', description: 'Doctor consultation', status: 'pending' },
      { id: '6', step_number: 6, title: 'Diagnosis', description: 'Medical diagnosis', status: 'pending' },
      { id: '7', step_number: 7, title: 'Treatment Plan', description: 'Create treatment plan', status: 'pending' },
      { id: '8', step_number: 8, title: 'Lab Tests', description: 'Laboratory tests if needed', status: 'pending' },
      { id: '9', step_number: 9, title: 'Imaging', description: 'Medical imaging if required', status: 'pending' },
      { id: '10', step_number: 10, title: 'Prescription', description: 'Issue prescriptions', status: 'pending' },
      { id: '11', step_number: 11, title: 'Pharmacy', description: 'Medication dispensing', status: 'pending' },
      { id: '12', step_number: 12, title: 'Billing', description: 'Process billing and payments', status: 'pending' },
      { id: '13', step_number: 13, title: 'Discharge', description: 'Patient discharge process', status: 'pending' },
      { id: '14', step_number: 14, title: 'Follow-up Schedule', description: 'Schedule follow-up appointments', status: 'pending' },
      { id: '15', step_number: 15, title: 'Care Instructions', description: 'Provide post-care instructions', status: 'pending' },
      { id: '16', step_number: 16, title: 'Documentation', description: 'Complete medical documentation', status: 'pending' },
      { id: '17', step_number: 17, title: 'Quality Check', description: 'Quality assurance review', status: 'pending' },
      { id: '18', step_number: 18, title: 'Patient Feedback', description: 'Collect patient feedback', status: 'pending' },
      { id: '19', step_number: 19, title: 'Data Analytics', description: 'Analyze patient data', status: 'pending' },
      { id: '20', step_number: 20, title: 'Continuous Improvement', description: 'Process improvement initiatives', status: 'pending' }
    ];
  }

  async select(table) {
    return {
      data: this.data[table] || [],
      error: null
    };
  }

  async insert(table, data) {
    const newItem = {
      id: Date.now().toString(),
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    if (!this.data[table]) {
      this.data[table] = [];
    }
    
    this.data[table].push(newItem);
    
    return {
      data: newItem,
      error: null
    };
  }

  async update(table, id, data) {
    if (!this.data[table]) {
      return { data: null, error: 'Table not found' };
    }
    
    const index = this.data[table].findIndex(item => item.id === id);
    if (index === -1) {
      return { data: null, error: 'Record not found' };
    }
    
    this.data[table][index] = {
      ...this.data[table][index],
      ...data,
      updated_at: new Date().toISOString()
    };
    
    return {
      data: this.data[table][index],
      error: null
    };
  }

  async delete(table, id) {
    if (!this.data[table]) {
      return { data: null, error: 'Table not found' };
    }
    
    const index = this.data[table].findIndex(item => item.id === id);
    if (index === -1) {
      return { data: null, error: 'Record not found' };
    }
    
    const deleted = this.data[table].splice(index, 1)[0];
    
    return {
      data: deleted,
      error: null
    };
  }

  from(table) {
    return {
      select: () => this.select(table),
      insert: (data) => this.insert(table, data),
      update: (id, data) => this.update(table, id, data),
      delete: (id) => this.delete(table, id)
    };
  }
}

// Export the mock database instance
export const supabase = new MockDatabase();
export default supabase;