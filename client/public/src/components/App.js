import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import Footer from './Footer/Footer';

import { ToastContainer } from 'react-toastify';
import './styles/App.css';
import Verification from './Verification/Verification';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verification" element={<Verification />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
