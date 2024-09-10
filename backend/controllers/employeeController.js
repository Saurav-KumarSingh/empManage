import Employee from '../models/emp.model.js'; // Adjust the path if needed

// Controller to add a new employee
const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body); // Create a new employee with the request body
    await employee.save(); // Save the employee to the database
    res.status(201).json({ message: 'Employee added successfully!', employee });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle validation errors or other issues
  }
};

// Controller to get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employees
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

// Controller to get a single employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id); // Fetch employee by ID
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employee' });
  }
};

// Controller to update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

// Controller to search for employees
const searchEmployees = async (req, res) => {
    
  try {
    const { employeeID, name, department, startDate, endDate } = req.query;

    // Create query object
    const query = {};

    // Exact match for Employee ID
    if (employeeID) {
      query.employeeID = employeeID;
    }

    // Partial match for Name (both first and last names)
    if (name) {
      query.$or = [
        { firstName: new RegExp(name, 'i') },
        { lastName: new RegExp(name, 'i') }
      ];
    }

    // Exact match for Department
    if (department) {
      query.department = department;
    }

    // Range filter for Date of Joining
    if (startDate || endDate) {
      query.dateOfJoining = {};
      if (startDate) query.dateOfJoining.$gte = new Date(startDate);
      if (endDate) query.dateOfJoining.$lte = new Date(endDate);
    }

    // Execute the query
    const employees = await Employee.find(query);

    // Respond with the result
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Error fetching employee' });
  }
};

export default {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
};
