import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Admin = () => {
  const navigate = useNavigate();
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
    formData.append('descriptionHtml', description);

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await api.post('/api/industries', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIndustries([...industries, response.data]);
      resetIndustryForm();
    } catch (error) {
      console.error('Error adding industry:', error);
    }
  };

  const handleDeleteRisk = async (industryId, riskId) => {
    try {
      await api.delete(`/api/industries/${industryId}/risks/${riskId}`);
      setIndustries(industries.map(industry =>
        industry.id === industryId
          ? { ...industry, risks: industry.risks.filter(risk => risk.id !== riskId) }
          : industry
      ));
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  const handleEditRisk = (industryId, risk) => {
    // Implement your logic to edit risk
    console.log('Edit Risk:', industryId, risk);
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
    setDescription(industry.descriptionHtml);
    setImage(null);
  };

  const updateIndustry = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('descriptionHtml', description);

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
      resetIndustryForm();
    } catch (error) {
      console.error('Error updating industry:', error);
    }
  };

  const cancelEdit = () => {
    resetIndustryForm();
  };

  const resetIndustryForm = () => {
    setEditingIndustry(null);
    setName('');
    setDescription('');
    setImage(null);
  };

  const filteredIndustries = industries.filter((industry) =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <h1 style={{ color: '#2c3e50' }}>Industry Manager</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            resize: 'vertical',
          }}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            width: '100%',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
        {editingIndustry ? (
          <>
            <button
              onClick={updateIndustry}
              style={{
                backgroundColor: '#f39c12',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Update Industry
            </button>
            <button
              onClick={cancelEdit}
              style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addIndustry}
            style={{
              backgroundColor: '#2ecc71',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Industry
          </button>
        )}
      </div>
      <input
        type="text"
        placeholder="Search industries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ddd',
        }}
      />
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {filteredIndustries.map((industry) => (
          <li
            key={industry.id}
            style={{
              marginBottom: '20px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <div style={{ marginBottom: '10px' }}>
              <h2>{industry.name}</h2>
              <p>{industry.descriptionHtml}</p>
              {industry.imagePath && (
                <img
                  src={`/${industry.imagePath}`} // Adjust this based on your image path
                  alt={industry.name}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
            </div>
            <div style={{ marginTop: '10px' }}>
              <Link to={`/industry/${industry.id}/addRisk`}>
                <button
                  style={{
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Add Risk
                </button>
              </Link>
              <button
                onClick={() => deleteIndustry(industry.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Delete Industry
              </button>
              <button
                onClick={() => startEditIndustry(industry)}
                style={{
                  backgroundColor: '#f39c12',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Edit Industry
              </button>
            </div>
            <ul style={{ listStyleType: 'none', padding: '0', marginTop: '10px' }}>
              {industry.risks && industry.risks.map((risk) => (
                <li
                  key={risk.id}
                  style={{
                    marginBottom: '10px',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <h3>{risk.riskName}</h3>
                    <p>{risk.riskDetails}</p>
                    {risk.imagePath && (
                      <img
                        src={`/${risk.imagePath}`} // Adjust this based on your image path
                        alt={risk.riskName}
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => handleEditRisk(industry.id, risk)}
                    style={{
                      backgroundColor: '#f39c12',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    Edit Risk
                  </button>
                  <button
                    onClick={() => handleDeleteRisk(industry.id, risk.id)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete Risk
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
