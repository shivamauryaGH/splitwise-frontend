import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/createUser.css'; // Create a separate CSS file for styling



const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [amount,setAmount]=useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); // Hook for navigation


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    const newUser = { name, email, password,amount };

    axios.post('http://localhost:5080/api/splits/signup', newUser)
      .then((response) => {
        setSuccessMessage('User created successfully!');
        })
        .then( () => {
          navigate('/userDetails',{state:{email}}); // Pass the email to the login page
        })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

 



  return (
    <div className="create-user-form">
      <h2>Create User</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Amount:
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </label>
        <button type="submit"  >Create User</button>
        {/* <button type="button"  >Go to User info</button>  */}
      </form>
    </div>
  );
};

export default CreateUser;
