import Employee from '../models/emp.model.js'; // Adjust the path if needed

// Controller to add a new employee
const addEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body); 
    await employee.save(); 
    res.status(201).json({ message: 'Employee added successfully!' ,success:true});
  } catch (error) {
    res.status(400).json({ error: error.message  ,success:false});
  }
};


// Controller to update an employee
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found',success:false });
    }
    res.status(200).json({ message: 'Employee updated successfully',success:true});
  } catch (error) {
    res.status(400).json({ error: error.message,success:false });
  }
};
// Controller to get an employee
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

// Controller to delete an employee
const deleteEmployee = async (req, res) => {
  console.log(req.params)
  try {
    const { id } = req.params; 
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found', success: false });
    }

    res.status(200).json({ message: 'Employee deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting employee:', error); // Log error for debugging
    res.status(500).json({ error: 'Error deleting employee', success: false });
  }
};


const searchEmployees = async (req, res) => {
  try {
    const { employeeID, name, department, startDate, endDate } = req.query;

    // Create query object
    const query = {};

    // Determine which parameter is provided and build the query accordingly
    if (employeeID) {
      query.employeeID = employeeID;
    } else if (name) {
      query.$or = [
        { firstName: new RegExp(name, 'i') },
        { lastName: new RegExp(name, 'i') }
      ];
    } else if (department) {
      query.department = department;
    } else if (startDate || endDate) {
      query.dateOfJoining = {};
      if (startDate) query.dateOfJoining.$gte = new Date(startDate);
      if (endDate) query.dateOfJoining.$lte = new Date(endDate);
    }

    // If no query parameter is provided, set query to match all documents
    if (Object.keys(query).length === 0) {
      // No specific query parameters, return all employees
      query; // or simply set `query = {}` to match all documents
    }

    // Execute the query
    const employees = await Employee.find(query);

    // Respond with the result
    res.status(200).json({ message: 'Employees found!', employees, success: true });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Error fetching employees', success: false });
  }
};



export default {
  addEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees
};
