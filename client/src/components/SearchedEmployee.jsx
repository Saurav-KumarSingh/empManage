import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState(''); // Default search type
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all employees when the component mounts
        handleSearch();
    }, [employees]);

    const handleSearch = async (e) => {
        if (e) e.preventDefault(); // Prevent default form submission if called from the form

        try {
            const params = {};

            if (searchType === 'dateRange') {
                params.startDate = startDate;
                params.endDate = endDate;
            } else if (searchType === 'department') {
                params.department = department;
            } else if (searchType && searchTerm) {
                params[searchType] = searchTerm;
            }

            const response = await axios.get('http://localhost:8000/api/search', { params });
            setEmployees(response.data.employees);
            setError('');
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Error fetching employees');
            setEmployees([]);
        }
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSearchType('');
        setDepartment('');
        setStartDate('');
        setEndDate('');
        setEmployees([]);
        handleSearch(); // Fetch all employees after clearing filters
    };

    //handle delete 
    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:8000/api/delete/${id}`)
        console.log(response.data)
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg min-h-screen w-full">
            <h1 className="text-6xl font-bold my-6 text-center">Search Employees</h1>
            <form onSubmit={handleSearch} className="md:flex gap-6 justify-center mt-52 pb-10">
                <div className="flex gap-10 w-auto">
                    <div className="w-3/5 md:w-auto">
                        <select
                            value={searchType}
                            onChange={(e) => {
                                setSearchType(e.target.value);
                                setSearchTerm('');
                                setDepartment('');
                                setStartDate('');
                                setEndDate('');
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                        >
                            <option value="">Select Search Type</option>
                            <option value="employeeID">Employee ID</option>
                            <option value="name">Name</option>
                            <option value="department">Department</option>
                            <option value="dateRange">Date of Joining</option>
                        </select>
                    </div>

                    <div className="w-[50vw]">
                        {searchType === 'dateRange' && (
                            <div className="space-y-2">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                                />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>
                        )}

                        {searchType === 'department' && (
                            <div>
                                <select
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                                >
                                    <option value="">Select Department</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Developer">Developer</option>
                                </select>
                            </div>
                        )}

                        {(searchType !== 'dateRange' && searchType !== 'department') && (
                            <div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-4 items-center mt-4 md:mt-0">
                    <button
                        type="submit"
                        className="w-full md:w-32 h-12 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="w-full md:w-32 h-12 text-lg bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            </form>

            {/* Display the results */}
            <div className="mt-12">
                {error && <p className="text-red-600 text-center">{error}</p>}
                {employees.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                        {employees.map((employee) => (
                            <div key={employee._id} className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 flex flex-col">

                                <div>
                                    <h2 className="text-xl font-semibold mb-4">
                                        {employee.firstName} {employee.lastName}
                                    </h2>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">ID:</span> {employee.employeeID}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Email:</span> {employee.email}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Phone:</span> {employee.phoneNumber}</p>
                                    <p className="text-gray-700 mb-1"><span className="font-medium">Department:</span> {employee.department}</p>
                                    <p className="text-gray-700 mb-4"><span className="font-medium">Date of Joining:</span> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
                                </div>
                                <div className='flex justify-between mt-4 mb-2'>
                                    <Link to={`/employee/edit/${employee._id}`}>
                                        <span className="border border-blue-600 rounded-full px-4 text-xs text-blue-600 py-0.5">
                                            edit
                                        </span>
                                    </Link>
                                    <button onClick={() => handleDelete(employee._id)}>
                                        <span className="border border-red-600 rounded-full px-4 text-xs text-red-600 py-0.5">
                                            delete
                                        </span>
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    !error && <p className="text-center text-gray-600">No employees found</p>
                )}
            </div>
        </div>
    );
};

export default SearchForm;
