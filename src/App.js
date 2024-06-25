import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import IndustryDetails from './components/IndustryDetails';
import UIndustryDetails from './components/UIndustryDetails';
import AddRisk from './components/AddRisk';
import App2 from './JsonDataDisplay2';
import Admin from './components/Admin';
import RiskDetails from './components/Template';
import Risks from './components/Risks.js';
import Userinterface from './userinterface.js';
import Notifications from './components/Notifications.js';
import AboutUs from './AboutUs.js';
import AddIndustry from './components/AddIndustry.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/365risk/*" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Uindustries" element={<Userinterface />} />
          <Route path="industries" element={<App2 />} />
          <Route path="risks" element={<Risks />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="industry/:id" element={<IndustryDetails />} />
          <Route path="uindustry/:id" element={<UIndustryDetails />} />
          <Route path="industry/:id/risk/:riskId" element={<RiskDetails />} />
          <Route path="industry/:id/addRisk" element={<AddRisk />} />
          <Route path="add-risk" element={<AddRisk />} />
          <Route path="addindustry" element={<AddIndustry />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="Notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
