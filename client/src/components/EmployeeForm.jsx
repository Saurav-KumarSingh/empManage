import React, { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast';

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    department: '',
    position: '',
    dateOfJoining: '',
    salary: ''
  });

  const departments = ['IT', 'HR', 'Finance'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response=await axios.post('http://localhost:8000/api/addemployee',formData)
    const empresponse=await response.data
    if (empresponse.success==true) {
        
        toast.success(empresponse.message);
    }
    
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md bg-white">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Employee ID *</label>
        <input
          type="text"
          name="employeeID"
          value={formData.employeeID}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name *</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date of Birth (Optional)</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Department *</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Position (Optional)</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date of Joining *</label>
        <input
          type="date"
          name="dateOfJoining"
          value={formData.dateOfJoining}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Salary *</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>

    </>
  );
};

export default AddEmployeeForm;
