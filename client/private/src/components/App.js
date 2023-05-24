import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
// import Header from './Header/Header';
// import Home from './Home/Home';
// import VerifyVaccine from './VerifyVaccine/VerifyVaccine';
// import VerifyConsultation from './VerifyConsultation/VerifyConsultation';
// import Footer from './Footer/Footer';

import { ToastContainer } from 'react-toastify';
import '../styles/App.css';
import LoginPage from './Login/Login';
import SignupPage from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import Profile from './Profile/Profile';
import Consultation from './Consultation/Consultation';
import Vacciantion from './Vaccination/Vacciantion';
import Feedback from './Feedback/Feedback';
import ConsultationCertificate from './ConsultationCertificate/ConsultationCertificate';
import VaccinationCertificate from './VaccinationCertificate/VaccinationCertificate';
import CustomLoader from '../utils/CustomLoader';
import Transaction from './Transaction/Transaction';
import { PrivateRoute } from '../utils/privateRouting';

const App = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('accesstoken');
  const role = localStorage.getItem('role');

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/auth/login');
  //   }
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="App" style={{ height: '100vh' }}>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <BrowserRouter>
          <Header />
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/consultation"
              element={
                <PrivateRoute>
                  <Consultation />
                </PrivateRoute>
              }
            />
            <Route
              path="/vaccination"
              element={
                <PrivateRoute>
                  <Vacciantion />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <PrivateRoute>
                  <Feedback />
                </PrivateRoute>
              }
            />
            <Route
              path="/consultation-certificate"
              element={
                <PrivateRoute>
                  <ConsultationCertificate />
                </PrivateRoute>
              }
            />
            <Route
              path="/vaccination-certificate"
              element={
                <PrivateRoute>
                  <VaccinationCertificate />
                </PrivateRoute>
              }
            />
            <Route
              path="/transaction-history"
              element={
                <PrivateRoute>
                  <Transaction />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
