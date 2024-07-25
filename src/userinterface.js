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
                    src={`https://github.com/GRamaNagendra/EnterValues/blob/fbc30e4544b92eddc4250ac839dbd9ab2eb50b9c/src/main/resources/${industry.imagePath}`} 
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
