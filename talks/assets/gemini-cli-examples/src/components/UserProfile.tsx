import React, { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  fetchDetails: () => Promise<UserDetails>;
}

interface UserDetails {
  address: string;
  city: string;
}

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [details, setDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    user.fetchDetails().then(data => {
      setDetails(data);
    });
  }, [user]);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {details ? (
        <div>
          <p>Address: {details.address}</p>
          <p>City: {details.city}</p>
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default UserProfile;
