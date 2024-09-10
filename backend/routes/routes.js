import express from 'express';
const router = express.Router();
import employeeController from '../controllers/employeeController.js';

// Route to add a new employee
router.post('/addemployee', employeeController.addEmployee);

// Route to get all employees
router.get('/employees', employeeController.getEmployees);

// Route to get a single employee by ID
router.get('/employees/:id', employeeController.getEmployeeById);

// Route to update an employee by ID
router.put('/employees/:id', employeeController.updateEmployee);

// Route to delete an employee by ID
router.delete('/employees/:id', employeeController.deleteEmployee);

// Route to search employees with query parameters
router.get('/search', employeeController.searchEmployees);

export default router;
