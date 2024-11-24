import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    allUsers: 0,
    allBooks: 0,
    allCategories: 0,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/admin/dashboard'); // Replace with your API endpoint
        if (response.data.success) {
          setDashboardData({
            allUsers: response.data.allUsers,
            allBooks: response.data.allBooks,
            allCategories: response.data.allCategories,
          });
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin Dashboard</h1>
      {error ? (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Overview</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>Total Users:</strong> {dashboardData.allUsers}</li>
            <li><strong>Total Books:</strong> {dashboardData.allBooks}</li>
            <li><strong>Total Categories:</strong> {dashboardData.allCategories}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
