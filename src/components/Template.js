import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Adjust the path if needed

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
        <iframe 
          src={`http://localhost:8080/html/${risk.riskName}.html`} 
          style={{ width: '100%', height: '400px', border: 'none' }}
          title="Risk Description"
        />
      </div>

      {risk.imagePath && (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}>
          <h2 style={{ marginTop: '0' }}>Image</h2>
          <img 
            src={`http://localhost:8080/images/${risk.imagePath}`} 
            alt={risk.riskName} 
            style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
          />
        </div>
      )}

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
