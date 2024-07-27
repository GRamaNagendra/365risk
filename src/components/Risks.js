import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import App2 from '../JsonDataDisplay2';
import Carousels1 from '../Parts/Carousels';
import '../App.css';
import api from '../api';

const Risks = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await api.get('/api/industries');
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const containerStyle = {
    fontFamily: "'Arial', sans-serif",
    backgroundColor: '#f5f5f5',
    padding: '20px',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#333',
    margin: '20px 0',
  };

  const industryListStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0 auto',
    maxWidth: '600px',
  };

  const industryItemStyle = {
    backgroundColor: '#fff',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Add Risks</h1>
      <ul style={industryListStyle}>
        {industries.map((industry) => (
             <Link to={`/industry/${industry.id}`} style={linkStyle}>
          <li key={industry.id} style={industryItemStyle}>
         
              {industry.name}
           
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Risks;
