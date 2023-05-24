import React, { useEffect } from 'react';
import '../../styles/Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { listData } from './action';

const Dashboard = () => {
  const dispatch = useDispatch();
  const role = localStorage.getItem('role');
  const vaccinationsTaken = 5; // Example data - vaccinations taken
  useEffect(() => {
    dispatch(listData());
  }, []);
  const { counterData } = useSelector((e) => e.dashboardReducer);
  console.log('counterData', counterData);
  return (
    <div className="dashboard-container">
      {role === 'Patient' ? (
        <>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Consultations</h3>
              <p className="dashboard-value">{counterData.cosulcount}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Vaccinations</h3>
              <p className="dashboard-value">{counterData.vaccinecount}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Total Payment</h3>
              <p className="dashboard-value">${counterData.totalAmount}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Vaccinations Taken</h3>
              <p className="dashboard-value">{vaccinationsTaken}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Total Consultations</h3>
              <p className="dashboard-value">{counterData.cosulcount}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Total Vaccinations</h3>
              <p className="dashboard-value">{counterData.vaccinecount}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Total Users</h3>
              <p className="dashboard-value">{counterData.usercount}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
