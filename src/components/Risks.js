import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import App2 from '../JsonDataDisplay2';
import Carousels1 from '../Parts/Carousels';
import '../App.css'


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

  return (
    <div>






      <h1>Add Risks</h1>
      <ul className="industry-list">
        {industries.map((industry) => (
          <li key={industry.id}>
            <Link to={`/industry/${industry.id}`}>
              {industry.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Risks;
