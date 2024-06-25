import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const RiskDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    fetchRisk();
  }, []);

  const fetchRisk = async () => {
    try {
      const response = await axios.get(`/api/risks/${id}`);
      setRisk(response.data);
    } catch (error) {
      console.error('Error fetching risk:', error);
    }
  };

  const handleEdit = () => {
    history.push(`/risks/${id}/edit`); // Assuming you have an edit route for risks
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/risks/${id}`);
      history.push('/'); // Redirect to the home page or another appropriate route after deletion
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  if (!risk) {
    return <div>Loading...</div>;
  }

  return (
    <div>
  <h1>Not Workingriskdetails
    
  </h1>
      <h2>Risk Details:{risk.riskName}</h2>
      <p>Description: {risk.description}</p>
      <p>Name{risk.riskName}</p>
      <p>Identification: {risk.identification}</p>
      <p>Control: {risk.control}</p>
      <p>Mitigation: {risk.mitigation}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default RiskDetails;
