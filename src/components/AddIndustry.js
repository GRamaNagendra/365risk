import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const AddIndustry = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const addIndustry = async (e) => {
    e.preventDefault();
    const industryData = { name, description };

    try {
      await api.post('/api/industries', industryData);
      setName('');
      setDescription('');
      navigate('/'); // Navigate to the home page after successful addition
    } catch (error) {
      console.error('Error adding industry:', error);
    }
  };

  return (
    <div>
      <h1>Add New Industry</h1>
      <form onSubmit={addIndustry}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Industry</button>
      </form>
    </div>
  );
};

export default AddIndustry;
