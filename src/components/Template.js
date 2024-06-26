import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const RiskDetails = () => {
  const { id, riskId } = useParams();
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    fetchRisk();
  }, []);

  const fetchRisk = async () => {
    try {
      const response = await api.get(`/api/industries/${id}/risks/${riskId}`);
      setRisk(response.data);
    } catch (error) {
      console.error('Error fetching risk:', error);
    }
  };

  if (!risk) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
      <h1>{risk.riskName}</h1>

      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
        <h2 style={{ marginTop: '0' }}>Description</h2>
        <p>{risk.description}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
        <h2 style={{ marginTop: '0' }}>Identification</h2>
        <p>{risk.identification}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
        <h2 style={{ marginTop: '0' }}>Control</h2>
        <p>{risk.control}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
        <h2 style={{ marginTop: '0' }}>Mitigation</h2>
        <p>{risk.mitigation}</p>
      </div>
    </div>
  );
};

export default RiskDetails;
