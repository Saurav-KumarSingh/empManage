import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:underline">Employee Management</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/employee" className="hover:underline">Search Employees</Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">Add Employee</Link>
            </li>
            {/* Add more navigation links here as needed */}
          </ul>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;
