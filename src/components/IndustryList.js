import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api';

const IndustryList = () => {
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

  return (
    <div>
      <h2>Industries</h2>
      <ul>
        {industries.map(industry => (
          <li key={industry.id}>
            <Link to={`/industries/${industry.id}`}>{industry.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustryList;
