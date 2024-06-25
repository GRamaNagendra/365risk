import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';

const AddRisk = () => {
  const { id } = useParams();
  const [riskName, SetRiskName] =useState('');
  const [description, setDescription] = useState('');
  const [identification, setIdentification] = useState('');
  const [control, setControl] = useState('');
  const [mitigation, setMitigation] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const addRisk = async (e) => {
    e.preventDefault();
    const riskData = { riskName,description, identification, control, mitigation };

    try {
      await axios.post(`/api/industries/${id}/risks`, riskData);
      SetRiskName('')
      setDescription('');
      setIdentification('');
      setControl('');
      setMitigation('');
      // Redirect to industry details page after adding risk
      navigate(`//365risk/industry/${id}`);
    } catch (error) {
      console.error('Error adding risk:', error);
    }
  };

  return (
    <div>
      <h1>Add New Risk</h1>
      <form onSubmit={addRisk}>
      <input
          type="text"
          placeholder="RiskName"
          value={riskName}
          onChange={(e) => SetRiskName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Description222"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Identification"
          value={identification}
          onChange={(e) => setIdentification(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Control"
          value={control}
          onChange={(e) => setControl(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Mitigation"
          value={mitigation}
          onChange={(e) => setMitigation(e.target.value)}
        />
        <button type="submit">Add Risk</button>
      </form>
    </div>
  );
};

export default AddRisk;
