import React from 'react'
import { Toaster } from 'react-hot-toast'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import AddEmployeeForm from './components/EmployeeForm'
import SearchForm from './components/SearchedEmployee'
import Header from './components/Header'
import EditEmployeeForm from './components/EditEmployee'


const App = () => {
  
  return (
    <div>
      <Toaster/>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<AddEmployeeForm />}/>
          <Route path='/employee' element={<SearchForm />}/>
          <Route path='/employee/edit/:id' element={<EditEmployeeForm/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App