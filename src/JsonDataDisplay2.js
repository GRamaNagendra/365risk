import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App2.css';
import api from './api';

const App2 = () => {
  const [industries, setIndustries] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingIndustry, setEditingIndustry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const addIndustry = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await api.post('/api/industries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newIndustry = response.data;
      setIndustries([...industries, newIndustry]);
      setName('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding industry:', error);
    }
  };

  const deleteIndustry = async (id) => {
    try {
      await api.delete(`/api/industries/${id}`);
      setIndustries(industries.filter((industry) => industry.id !== id));
    } catch (error) {
      console.error('Error deleting industry:', error);
    }
  };

  const startEditIndustry = (industry) => {
    setEditingIndustry(industry);
    setName(industry.name);
    setDescription(industry.description);
    setImage(null);
  };

  const updateIndustry = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.put(`/api/industries/${editingIndustry.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchIndustries();
      setEditingIndustry(null);
      setName('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error updating industry:', error);
    }
  };

  const cancelEdit = () => {
    setEditingIndustry(null);
    setName('');
    setDescription('');
    setImage(null);
  };

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Industry Manager</h1>
      <div className="form-container">
        <textarea
          type="text"
          style={{height:'60px'}}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5} // Adjust the number of visible rows as needed
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {editingIndustry ? (
          <>
            <button onClick={updateIndustry}>Update Industry</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={addIndustry}>Add Industry</button>
        )}
      </div>
      <input
        type="text"
        className="search-bar"
        placeholder="Search industries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="industry-list">
        {filteredIndustries.map((industry) => (
          <li key={industry.id} className="industry-item">
            <span><b>{industry.name}</b></span><br/>
            <span>{industry.description}</span><br/>
            {industry.imagePath && (
              <img
                src={`${process.env.PUBLIC_URL}/${industry.imagePath}`}
                alt={industry.name}
                className="industry-image"
              />
            )}
            <div className="button-group">
              <button onClick={() => deleteIndustry(industry.id)}>Delete</button>
              <button onClick={() => startEditIndustry(industry)}>Edit</button>
              {/* Remove the button for adding risk */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App2;
