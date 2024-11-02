


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/userExpense.css'; // Assuming you have a separate CSS file for dynamic styling
import { Navigate } from 'react-router-dom';


const UserExpense = () => {
  const location = useLocation();
  const { user, users ,shouldRefresh} = location.state || { user: null, users: [],shouldRefresh:false }; // Default values to prevent errors
  const [expenses, setExpenses] = useState([]);
  const navigate=useNavigate();

  // Fetch user expenses on load
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5080/api/splits/expense/${user._id}`);
        setExpenses(response.data); // Assuming API returns a list of expenses for the user
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    if (user) {
      fetchExpenses();
    }

    if(shouldRefresh){
      fetchExpenses();
    }
  }, [user,shouldRefresh]);

 
   

  // Function to get participant names instead of their IDs
  const getParticipantNames = (participantIds) => {
    return participantIds.map(id => {
      const foundUser = users.find(u => u._id === id);
      return foundUser ? foundUser.name : 'Unknown User'; // Return name or fallback for unknown users
    }).join(', ');
  };

  // Function to get the name of the user who paid
  const getPaidByName = (paidById) => {
    const foundUser = users.find(u => u._id === paidById);
    return foundUser ? foundUser.name : 'Unknown User'; // Return the name of the user who paid
  };

 
  const handleAddExpense=()=>{
    navigate('/addExpense',{ state: { user ,users} })
  }


   // Handle case when expenses are not yet available or empty
   if (!expenses || expenses.length === 0) {
    return (
      <div className="no-expenses-container">
        <p className="no-expenses-message">No expenses found</p>
        <button className="add-expense-container" onClick={handleAddExpense}>Add Expense</button>
      </div>
    );
  }


  return (
    <div className="user-expense-container">
      <h2>Expenses for {user.name}</h2>

      {/* Expense Grid Container */}
      <div className="expense-grid-container">
        {/* Header Row */}
        <div className="expense-grid-row header">
          <div className="expense-grid-item"><strong>Description</strong></div>
          <div className="expense-grid-item"><strong>Amount</strong></div>
         
          <div className="expense-grid-item"><strong>Participants</strong></div>
           <div className="expense-grid-item"><strong>Paid By</strong></div>
        </div>

        {/* Expense Rows */}
        {expenses.map((expense) => (
          <div className="expense-grid-row" key={expense._id}>
            <div className="expense-grid-item">{expense.description}</div>
            <div className="expense-grid-item">{expense.amount}</div>
           
            <div className="expense-grid-item">{getParticipantNames(expense.participants)}</div>
             <div className="expense-grid-item">{getPaidByName(expense.paidBy)}</div> 
          </div>
        ))}
      </div>

      {/* Button to Add Expense */}
      <div className="add-expense-container">
        <button className="add-expense-btn" onClick={handleAddExpense} >Add Expense</button>
      </div>

      
    </div>
  );
};

export default UserExpense;

