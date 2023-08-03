import React, { useState } from 'react';
import RegisterForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
import EditUser from './components/EditUser';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState('');
  const [editUserId, setEditUserId] = useState(null);

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
  };

  const handleLoginSuccess = (userToken) => {
    setToken(userToken);
  };

  const handleEditUser = (userId) => {
    setEditUserId(userId);
  };

  return (
    <div>
    {!isRegistered ? (
      <>
        <h1>Register</h1>
        <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
      </>
    ) : !token ? (
      <>
        <h1>Login</h1>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </>
    ) : (
      <>
        {editUserId ? (
          <>
            <h1>Edit User</h1>
            <EditUser userId={editUserId} />
          </>
        ) : (
          <>
            <h1>User List</h1>
            <UserList token={token} onEditUser={handleEditUser} />
          </>
        )}
      </>
    )}
  </div>
  );
};

export default App;

