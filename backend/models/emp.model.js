import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeID: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
  phoneNumber: {
    type: String,
    match: [/^\d*$/, 'Phone number is not valid! Only numeric values are allowed.'],
    default: null,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  department: {
    type: String,
    required: true,
    enum: ['IT', 'HR', 'Finance']
  },
  position: {
    type: String,
    default: null,
    trim: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true,
    min: [0, 'Salary must be a positive number'],
    match: [/^\d*$/, 'salary is not valid'],
  }
  
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
