import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import api from '../api';

const AddRisk = () => {
  const { id } = useParams(); // Get industry ID from URL params
  const [riskName, setRiskName] = useState('');
  const [riskDetails, setRiskDetails] = useState('');
  const [riskImage, setRiskImage] = useState(null);
  const [editingRisk, setEditingRisk] = useState(null); // For editing existing risk
  const navigate = useNavigate();
  const editor = useRef(null);

  // Fetch existing risk details if editing
  useEffect(() => {
    const fetchRiskDetails = async () => {
      try {
        const response = await api.get(`/api/industries/${id}/risks/${editingRisk}`);
        const { riskName, riskDetails } = response.data;
        setRiskName(riskName);
        setRiskDetails(riskDetails);
      } catch (error) {
        console.error('Error fetching risk details:', error);
      }
    };

    if (editingRisk) {
      fetchRiskDetails();
    }
  }, [id, editingRisk]);

  // Function to handle form submission for adding or updating risk
  const handleRiskSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('riskName', riskName);
    formData.append('riskDetails', riskDetails);
    if (riskImage) {
      formData.append('riskImage', riskImage);
    }

    try {
      if (editingRisk) {
        // Update existing risk
        await api.put(`/api/industries/${id}/risks/${editingRisk}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Add new risk
        await api.post(`/api/industries/${id}/risks`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      setRiskName('');
      setRiskDetails('');
      setRiskImage(null);
      setEditingRisk(null);
      navigate(`/industry/${id}`);
    } catch (error) {
      console.error('Error adding/updating risk:', error);
    }
  };

  // Function to delete a risk
  const deleteRisk = async (riskId) => {
    try {
      await api.delete(`/api/industries/${id}/risks/${riskId}`);
      navigate(`/industry/${id}`);
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  // JoditEditor configuration
  const config = {
    readonly: false,
    height: 400,
    toolbar: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'superscript', 'subscript', '|',
      'ul', 'ol', 'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', '|',
      'image', 'video', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize', 'print', 'about'
    ]
  };

  return (
    <div>
      <h1>{editingRisk ? 'Edit Risk' : 'Add New Risk'}</h1>
      <form onSubmit={handleRiskSubmit}>
        <label>Risk Name:</label>
        <input
          type="text"
          value={riskName}
          onChange={(e) => setRiskName(e.target.value)}
          required
        />
        <label>Risk Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setRiskImage(e.target.files[0])}
        />
        <br />
        <label>Risk Details:</label>
        <JoditEditor
          ref={editor}
          value={riskDetails}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setRiskDetails(newContent)}
          onChange={() => {}}
          placeholder="Enter detailed risk information..."
        />
        <button type="submit">{editingRisk ? 'Update Risk' : 'Add Risk'}</button>
      </form>

      {/* Delete button shown if editing an existing risk */}
      {editingRisk && (
        <button onClick={() => deleteRisk(editingRisk)}>Delete Risk</button>
      )}
    </div>
  );
};

export default AddRisk;
