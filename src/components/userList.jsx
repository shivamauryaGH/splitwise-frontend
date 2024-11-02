import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserList.css';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const navigate = useNavigate(); // Hook for navigation


  useEffect(() => {
    fetchUsers();
  }, []);
  

  const handleLoginClick = (email) => {
    navigate('/login', { state: { email } }); // Pass the email to the login page
  };

  const handleCreateUserClick = () => {
    navigate('/createUser'); // Navigate to the CreateUser route
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5080/api/splits/'); // Adjust the URL as needed
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // const handleUserCreated = () => {
  //   setShowCreateUserForm(false); // Close form after user creation
  //   fetchUsers(); // Refresh user list
  // };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email ID</th>
            <th>Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleLoginClick(user.email)}>Login</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateUserClick} >Create New User</button>
      {showCreateUserForm && <CreateUser onUserCreated={handleUserCreated} />}
    </div>
  );
};


export default UserList;
