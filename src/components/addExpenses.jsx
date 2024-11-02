import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/addExpense.css'; // Assuming you have styles for the form
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const { user, users } = location.state || { user: null, users: [] }; // Default values to prevent 



  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [participantNames, setParticipantNames] = useState(''); // Input for names
  const [category, setCategory] = useState('');
  
 
  
  
  // Function to find user by name and convert to userId
  const convertNamesToIds = () => {
    const namesArray = participantNames.split(',').map(name => name.trim());
    const participantIds = namesArray.map(name => {
      const foundUser = users.find(user => user.name === name);
      return foundUser ? foundUser._id : null; // Find user by name and get the ID
    });
    return participantIds.filter(id => id !== null); // Filter out any null values
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const participantIds = convertNamesToIds(); // 
   

    const newExpense = {
      description,
      amount,
      category,
      paidBy: user._id,
      participants: participantIds, // Store participants as IDs
    };

    try {
      await axios.post('http://localhost:5080/api/splits/add', newExpense);
      alert('Expense added successfully!');
    
  //  // Fetch updated expenses list for the user
  //  const response = await axios.get(`http://localhost:5080/api/splits/expense/${user._id}`);
    
   // Redirect back to UserExpense with shouldRefresh flag
   navigate('/userExpense', { 
    state: { user, users, shouldRefresh: true } 
  });
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    }
  };

  return (
    <div className="add-expense-form-container">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Paid By</label>
          <input
            type="text"
            value={user.name}
            // onChange={(e) => setPaidBy(user.name)}
            // required
            placeholder="Enter name of the user who paid"
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="Enter expense category"
          />
        </div>

        <div className="form-group">
          <label>Participants</label>
          <input
            type="text"
            value={participantNames}
            onChange={(e) => setParticipantNames(e.target.value)}
            required
            placeholder="Enter participant names, separated by commas"
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;
