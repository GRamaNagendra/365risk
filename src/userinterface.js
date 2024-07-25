import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from './api';

const Userinterface = () => {
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
    <div className="container">
      <h1>Industries2</h1>
      <ul className="industry-list">
        {industries.map((industry) => (
          <li key={industry.id} className="industry-item">
            <Link to={`/uindustry/${industry.id}`}>
              <h3>{industry.name}</h3>
            </Link>
            <p>{industry.description}</p>
            <img
                    src={`https://fantastic-halibut-6jqrr9v54q7f4jww-8080.app.github.dev/${industry.imagePath}`} 
                alt={industry.name}
                className="industry-image"
              />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Userinterface;
