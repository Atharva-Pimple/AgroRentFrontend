import React, { useEffect, useState } from 'react';
import { getAllUsers, enableUser, disableUser, getToken, getUserRole } from '../services/UserServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingUsers, setUpdatingUsers] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const role = getUserRole();
    
    if (!token) {
      navigate('/signin');
    } else if (role !== 'ROLE_ADMIN') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    } else {
      fetchUsers();
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
      } else {
        setError('Failed to load users. Please try again later.');
        toast.error('Failed to load users. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = async (email, currentStatus) => {
    try {
      setUpdatingUsers(prev => new Set(prev).add(email));
      
      const response = currentStatus 
        ? await disableUser(email)
        : await enableUser(email);
      
      toast.success(response.data.message);
      
      // Update the user status in the local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.email === email 
            ? { ...user, active: !currentStatus }
            : user
        )
      );
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
      } else {
        toast.error(err.response?.data?.message || 'Failed to update user status.');
      }
    } finally {
      setUpdatingUsers(prev => {
        const newSet = new Set(prev);
        newSet.delete(email);
        return newSet;
      });
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_FARMER':
        return 'Farmer';
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <div className="users-container main-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-container main-content">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchUsers} className="retry-button">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="users-container main-content">
      <div className="users-header">
        <h1>User Management</h1>
        <p>Manage all registered users in the system</p>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email} className="user-row">
                <td className="user-name">
                  {user.firstName} {user.lastName}
                </td>
                <td className="user-email">{user.email}</td>
                <td className="user-role">
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </td>
                <td className="user-status">
                  <span className={`status-badge ${user.active ? 'active' : 'inactive'}`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="user-actions">
                  <button
                    className={`toggle-button ${user.active ? 'disable' : 'enable'}`}
                    onClick={() => handleToggleUserStatus(user.email, user.active)}
                    disabled={updatingUsers.has(user.email)}
                  >
                    {updatingUsers.has(user.email) ? (
                      <div className="button-spinner"></div>
                    ) : (
                      user.active ? 'Disable' : 'Enable'
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="no-users">
            <div className="no-users-icon">👥</div>
            <h3>No Users Found</h3>
            <p>No users are currently registered in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
