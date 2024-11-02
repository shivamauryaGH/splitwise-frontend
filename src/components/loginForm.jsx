


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const LoginForm = () => {
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5080/api/splits/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
      setErrorMessage('User not registered');
    } else if (user.password !== password) {
      setErrorMessage('Wrong email and password combination');
    } else {
      setErrorMessage('');
      navigate('/userDetails', { state: { email } });
    }
  };

  return (
    <div className="login-form-overlay">
      <div className="login-form">
        <h3>Login Form</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              placeholder="Enter your gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="create-account">If not registered, <a href="/createuser">Create one</a></div>
      </div>
    </div>
  );
};

export default LoginForm;


