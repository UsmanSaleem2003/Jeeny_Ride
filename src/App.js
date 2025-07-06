import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import RequestRide from './pages/RequestRide/RequestRide';
import RideStatus from './pages/RideStatus/RideStatus';
import RideHistory from './pages/RideHistory/RideHistory';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={user ? <RequestRide /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ride-status" element={<RideStatus />} />
          <Route path="/ride-history" element={<RideHistory />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
