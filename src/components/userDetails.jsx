


import { useState, useEffect } from 'react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/userDetail.css'; // Importing dynamic and responsive styles

const UserDetails = () => {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { email } = location.state;
  const [user, setUser] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [transferAmount, setTransferAmount] = useState('');


  const handleGetExpense = () => {
    navigate('/userExpense', { state: { user ,users} });
  };
  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5080/api/splits/email/${email}`);
        setUser(response.data); // Set the fetched user data
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [email]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5080/api/splits/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers(); // Call the function immediately
  }, []);

  // Function to get names and amounts from userIds
  const getNamesWithAmounts = (ids) => {
    return ids.map(({ userId, amount }) => {
      const foundUser = users.find(user => user._id === userId);
      return foundUser ? `${foundUser.name} (${amount})` : 'Unknown User'; // Return name and amount or a fallback
    });
  };


  // Handle Payment Submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    const recipient = users.find(u => u.name === recipientName);
    if (!recipient) {
      alert('User not found');
      return;
    }
    try {
      const response = await axios.patch('http://localhost:5080/api/splits/record', {
        fromUserId: user._id,
        toUserId: recipient._id,
        amount: Number(transferAmount),
      });
      if (response.data.success) {
        alert('Payment successfully transferred');
        setUser(response.data.updatedUser);
        setShowPaymentForm(false);
        setRecipientName('');
        setTransferAmount('');
      } else {
        console.log(response.data.success);
        alert('Payment successfully transferred');
      }
    } catch (error) {
      console.error('Error processing payment:', error.response || error.message);
    }
  };

  // Handle case when user data is not yet available
  if (!user) {
    return <div>Loading user details...</div>; // Show loading message or spinner
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      
      <div className="user-detail-row">
        <div className="user-detail-label">Name:</div>
        <div className="user-detail-value">{user.name}</div>
      </div>

      <div className="user-detail-row">
        <div className="user-detail-label">Email:</div>
        <div className="user-detail-value">{user.email}</div>
      </div>

      <div className="user-detail-row">
        <div className="user-detail-label">Password:</div>
        <div className="user-detail-value">{user.password}</div>
      </div>

      <div className="user-detail-row">
        <div className="user-detail-label">Amount:</div>
        <div className="user-detail-value">{user.amount}</div>
      </div>

      <div className="user-detail-row">
        <div className="user-detail-label">Credit:</div>
        <div className="user-detail-value">
          {user.credit && user.credit.length > 0
            ? getNamesWithAmounts(user.credit).join(', ')
            : 'No credits'}
        </div>
      </div>

      <div className="user-detail-row">
        <div className="user-detail-label">Debit:</div>
        <div className="user-detail-value">
          {user.debit && user.debit.length > 0
            ? getNamesWithAmounts(user.debit).join(', ')
            : 'No debits'}
        </div>
      </div>

      {/* Add Expense Button */}
      <div className="add-expense-container">
        <button className="add-expense-btn" onClick={handleGetExpense}>Get Expense</button>
      </div>


      <div className="add-expense-container">
        <button className="add-expense-btn" onClick={() => setShowPaymentForm(!showPaymentForm)}>
          Handle Payment
        </button>
      </div>


      {showPaymentForm && (
        <div className="payment-form-container">
          <h3>Transfer Money</h3>
          <form onSubmit={handlePaymentSubmit}>
            <label>
              Recipient Name:
              <input
                type="text"
                placeholder="Enter recipient's name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                required
              />
            </label>
            <label>
              Amount:
              <input
                type="number"
                placeholder="Enter amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="submit-payment-btn">Submit Payment</button>
          </form>
        </div>
      )}

    </div>
  );
};

export default UserDetails;

