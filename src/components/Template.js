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
    <div className="risk-details-container" style={styles.container}>
      <h1 style={styles.title}>{risk.riskName}</h1>

      {risk.imagePath && (
        <div style={styles.imageContainer}>
         
          <img 
            src={`https://fantastic-halibut-6jqrr9v54q7f4jww-8080.app.github.dev/${risk.imagePath}`} 
            alt={risk.riskName} 
            style={styles.image}
          />
        </div>
      )}

      <div style={styles.descriptionContainer}>
      
        <iframe 
          src={`https://fantastic-halibut-6jqrr9v54q7f4jww-8080.app.github.dev/html/${risk.riskName}.html`} 
          style={styles.iframe}
          title="Risk Description"
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f0f8ff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '100%',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2.5em',
    fontWeight: '700',
    marginBottom: '20px',
  },
  sectionTitle: {
    color: '#555',
    fontSize: '1.5em',
    fontWeight: '600',
    marginTop: '0',
  },

  image: {
    width: '100%',
    maxWidth: '900px',
    height: '400px',
    borderRadius: '4px',
    display: 'block',
    margin: '0 auto',
  },
  descriptionContainer: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  iframe: {
    width: '100%',
    height: '400px',
    border: 'none',
    display: 'block',
    margin: '4% auto',
  }
};

export default RiskDetails;
