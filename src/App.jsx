import { useState } from 'react'
import UserList from './components/userList'
import React from 'react';
import LandingPage from "./components/landingPage"
import CreateUser from './components/createUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginForm from './components/loginForm';
import UserDetails from './components/userDetails';
import UserExpense from './components/userExpense';
import AddExpense from './components/addExpenses';

function App() {
  
  return (
    <>
    <div  className="header">Split wise Expense manager</div>
         <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/userExpense" element={<UserExpense />} />
        <Route path="/addExpense" element={<AddExpense/>}/>

      </Routes>
    </Router>

    </>
  )
}

export default App
