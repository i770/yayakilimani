import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import VehicleRegistry from './pages/VehicleRegistry';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicles" element={<VehicleRegistry />} />
          <Route path="/fuel" element={<div className="p-4">Fuel Management Page</div>} />
          <Route path="/maintenance" element={<div className="p-4">Maintenance Page</div>} />
          <Route path="/drivers" element={<div className="p-4">Drivers Page</div>} />
          <Route path="/expenses" element={<div className="p-4">Expenses Page</div>} />
          <Route path="/reports" element={<div className="p-4">Reports Page</div>} />
          <Route path="/bookings" element={<div className="p-4">Bookings Page</div>} />
          <Route path="/tracking" element={<div className="p-4">Tracking Page</div>} />
          <Route path="/settings" element={<div className="p-4">Settings Page</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;