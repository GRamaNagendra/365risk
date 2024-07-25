import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import api from '../api';

const IndustryDetails = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [riskName, setRiskName] = useState('');
  const [riskDetails, setRiskDetails] = useState('');
  const [riskImage, setRiskImage] = useState(null);
  const [editingRisk, setEditingRisk] = useState(null);
  const navigate = useNavigate();
  const editor = useRef(null);

  useEffect(() => {
    fetchIndustry();
  }, []);

  const fetchIndustry = async () => {
    try {
      const response = await api.get(`/api/industries/${id}`);
      setIndustry(response.data);
    } catch (error) {
      console.error('Error fetching industry:', error);
    }
  };

  const deleteRisk = async (riskId) => {
    try {
      await api.delete(`/api/industries/${id}/risks/${riskId}`);
      fetchIndustry();
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  const handleUpdateClick = (risk) => {
    setEditingRisk(risk.id);
    setRiskName(risk.riskName);
    setRiskDetails(risk.riskDetails);
  };

  const handleCancelUpdate = () => {
    setEditingRisk(null);
    setRiskName('');
    setRiskDetails('');
    setRiskImage(null);
  };

  const handleRiskUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('riskName', riskName);
    formData.append('riskDetails', riskDetails);
    if (riskImage) {
      formData.append('riskImage', riskImage);
    }

    try {
      await api.put(`/api/industries/${id}/risks/${editingRisk}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setEditingRisk(null);
      setRiskName('');
      setRiskDetails('');
      setRiskImage(null);
      fetchIndustry();
    } catch (error) {
      console.error('Error updating risk:', error);
    }
  };

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

  if (!industry) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="text-center my-4">{industry.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: industry.descriptionHtml }} />
      <h2 className="my-4">Risks</h2>
      <Row>
        {industry.risks.map((risk) => (
          <Col xs={12} md={12} lg={12} key={risk.id} className="mb-4">
            <div className="p-3 border rounded">
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Risk Name:</strong> {risk.riskName}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Risk Details:</strong> {risk.riskDetails}
              </div>
              {risk.imagePath && (
                <div style={{ marginBottom: '10px' }}>
                  <img src={`/images/${risk.imagePath}`} alt="Risk" style={{ maxWidth: '100%' }} />
                </div>
              )}
              <Button variant="danger" onClick={() => deleteRisk(risk.id)}>Delete</Button>
              <Button variant="primary" onClick={() => handleUpdateClick(risk)} className="ml-2">Update</Button>
            </div>
          </Col>
        ))}
      </Row>
      {editingRisk && (
        <div className="mt-4">
          <h2>Update Risk</h2>
          <form onSubmit={handleRiskUpdate}>
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
            <button type="submit" className="btn btn-success mt-2">Update Risk</button>
            <button type="button" onClick={handleCancelUpdate} className="btn btn-secondary mt-2 ml-2">Cancel</button>
          </form>
        </div>
      )}
      <div className="text-center my-4">
        <Link to={`/industry/${id}/addRisk`}>
          <Button variant="success">Add New Risk</Button>
        </Link>
      </div>
    </Container>
  );
};

export default IndustryDetails;
