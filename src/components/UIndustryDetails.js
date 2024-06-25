import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const IndustryDetails = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);

  useEffect(() => {
    fetchIndustry();
  }, []);

  const fetchIndustry = async () => {
    try {
      const response = await axios.get(`/api/industries/${id}`);
      setIndustry(response.data);
    } catch (error) {
      console.error('Error fetching industry:', error);
    }
  };

  if (!industry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{industry.name}</h1>
      <p>{industry.description}</p>
      <h2>Risks</h2>
      <ul>
        {industry.risks.map((risk) => (
          <li key={risk.id}>
            <Link to={`/industry/${id}/risk/${risk.id}`}>{risk.riskName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndustryDetails;
