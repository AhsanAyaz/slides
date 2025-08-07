import React from 'react';
import UserProfile from './components/UserProfile';

const App = () => {
  const user = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    // A function to be refactored later
    fetchDetails: function() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            address: '123 Gemini St.',
            city: 'Mountain View'
          });
        }, 1000);
      });
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <UserProfile user={user} />
    </div>
  );
};

export default App;
