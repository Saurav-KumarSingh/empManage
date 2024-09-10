import express from 'express';
const router = express.Router();
import employeeController from '../controllers/employeeController.js';


router.post('/addemployee', employeeController.addEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/delete/:id', employeeController.deleteEmployee);
router.get('/employee/:id', employeeController.getEmployeeById);
router.get('/search', employeeController.searchEmployees);

export default router;
