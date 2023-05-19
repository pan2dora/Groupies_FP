import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const GroupMembership = ({ groupId }) => {
  const { isAuthenticated, user } = useAuth0();
  const userId = user?.sub;

  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchUserMembership();
    }
  }, [isAuthenticated, userId]);

  const fetchUserMembership = () => {
    fetch(`http://localhost:8080/group/${groupId}/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error checking membership');
        }
        return response.json();
      })
      .then((data) => {
        setIsMember(data.isMember);
      })
      .catch((error) => {
        console.error('Error checking membership:', error);
        setError(error.message);
      });
  };

  const handleToggleMembership = () => {
    const updatedMember = !isMember;
    fetch(`http://localhost:8080/group/${groupId}/user/${userId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ isMember: updatedMember }),
})
      .then((response) => {
        
        setIsMember(updatedMember);
      })
      .catch((error) => {
    
        setError(error.message);
      });
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {isAuthenticated && userId && (
        <button onClick={handleToggleMembership}>
          {isMember ? 'Unjoin' : 'Join'}
        </button>
      )}
      {!isAuthenticated && <div>Please log in to join the group</div>}
    </div>
  );
};

export default GroupMembership;
