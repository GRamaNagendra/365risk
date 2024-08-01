import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    backgroundColor: '#f8f9fa', // Light background color
  },
  addRiskForm: {
    backgroundColor: '#ffffff', // White background for form
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px', // Limit form width
    position: 'relative',
  },
  formHeader: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '700',
    color: '#343a40', // Dark color for header
  },
  formGroup: {
    marginBottom: '15px',
  },
  formLabel: {
    fontSize: '16px',
    fontWeight: '500',
  },
  formControl: {
    borderRadius: '8px',
    border: '1px solid #ced4da',
    padding: '10px',
    width: '100%',
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    border: '1px solid #007bff',
    borderRadius: '8px',
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnPrimaryHover: {
    backgroundColor: '#0056b3',
    border: '1px solid #0056b3',
  },
  btnSecondary: {
    borderRadius: '8px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  alert: {
    borderRadius: '8px',
    marginBottom: '20px',
  },
  hidden: {
    display: 'none',
  },
};

const AddRisk = () => {
  const { id, riskId } = useParams(); // Get industry ID and risk ID from URL params
  const [riskName, setRiskName] = useState('');
  const [riskDetails, setRiskDetails] = useState('');
  const [riskImage, setRiskImage] = useState(null);
  const [editingRisk, setEditingRisk] = useState(riskId || null); // Set editingRisk from URL params if available
  const [buttonHidden, setButtonHidden] = useState(false); // State to manage button visibility
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
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Add new risk
        await api.post(`/api/industries/${id}/risks`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      setRiskName('');
      setRiskDetails('');
      setRiskImage(null);
      setEditingRisk(null);
      setButtonHidden(true); // Hide the button after update
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
      'symbol', 'fullsize', 'print', 'about',
    ],
  };

  return (
    <div style={styles.formContainer}>
      <form style={styles.addRiskForm} onSubmit={handleRiskSubmit}>
        {/* Button Container */}
        <div style={styles.buttonContainer}>
          {editingRisk && (
            <button
              type="button"
              onClick={() => deleteRisk(editingRisk)}
              style={{ ...styles.btnSecondary, padding: '10px 20px', fontSize: '16px' }}
            >
              Delete Risk
            </button>
          )}
          {!buttonHidden && (
            <button
              type="submit"
              style={{ ...styles.btnPrimary, padding: '10px 20px', fontSize: '16px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.btnPrimaryHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.btnPrimary.backgroundColor}
            >
              {editingRisk ? 'Update Risk' : 'Add Risk'}
            </button>
          )}
        </div>

        <h1 style={styles.formHeader}>{editingRisk ? 'Edit Risk' : 'Add New Risk'}</h1>

        {/* Risk Name */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Risk Name:</label>
          <input
            type="text"
            value={riskName}
            onChange={(e) => setRiskName(e.target.value)}
            required
            style={styles.formControl}
          />
        </div>

        {/* Risk Image */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Risk Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setRiskImage(e.target.files[0])}
            style={styles.formControl}
          />
        </div>

        {/* Risk Details */}
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Risk Details:</label>
          <JoditEditor
            ref={editor}
            value={riskDetails}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setRiskDetails(newContent)}
            onChange={() => {}}
            placeholder="Enter detailed risk information..."
          />
        </div>
      </form>
    </div>
  );
};

export default AddRisk;
