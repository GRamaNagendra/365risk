import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Userinterface = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await axios.get('/api/industries');
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  return (
    <div className="container">
      <h1>Industries</h1>
      <ul className="industry-list">
        {industries.map((industry) => (
          <li key={industry.id} className="industry-item">
            <Link to={`/uindustry/${industry.id}`}>
              <h3>{industry.name}</h3>
            </Link>
            <p>{industry.description}</p>
            <img
                src={`${process.env.PUBLIC_URL}/${industry.imagePath}`}
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
