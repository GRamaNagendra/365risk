import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api'; // Adjust the path if needed

const HtmlContent = ({ riskName }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/365risk/EnterValues/main/src/main/resources/html/${riskName}.html`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchContent();
  }, [riskName]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const RiskDetails = () => {
  const { id, riskId } = useParams();
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    fetchRisk();
  }, [id, riskId]);

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
            src={`https://raw.githubusercontent.com/365risk/EnterValues/main/src/main/resources/images/${risk.imagePath}`} 
            alt={risk.riskName} 
            style={styles.image}
          />
        </div>
      )}

      <div style={styles.descriptionContainer}>
        <HtmlContent riskName={risk.riskName} />
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
  imageContainer: {
    textAlign: 'center',
    marginBottom: '20px',
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
};

export default RiskDetails;
