import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FeedbackForm from './components/FeedbackForm';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SuperAdmin from './components/SuperAdmin';
import Statistics from './components/Statistics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/admin" element={
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <MainContent />
            </div>
          </div>
        } />
        <Route path="/admin/:businessId" element={
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <MainContent />
            </div>
          </div>
        } />
        <Route path="/kingdomads" element={
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <SuperAdmin />
            </div>
          </div>
        } />
        <Route path="/kingdomads/statistics" element={
          <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <Statistics />
            </div>
          </div>
        } />
        <Route path="/business/:businessId" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;