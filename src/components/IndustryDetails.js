import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

const IndustryDetails = () => {
  const { id } = useParams();
  const [industry, setIndustry] = useState(null);
  const [updatedRisk, setUpdatedRisk] = useState({
    id: '',
    riskName: '',
    description: '',
    identification: '',
    control: '',
    mitigation: ''
  });
  const [selectedRiskId, setSelectedRiskId] = useState('');

  useEffect(() => {
    fetchIndustry();
  }, []);

  const fetchIndustry = async () => {
    try {
      const response = await axios.get(`/api/industries/${id}`);
      setIndustry(response.data);
    } catch (error) {
      console.error('Error fetching industry:', error);
    }
  };

  const deleteRisk = async (riskId) => {
    try {
      await axios.delete(`/api/industries/${id}/risks/${riskId}`);
      fetchIndustry();
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  const updateRisk = async () => {
    try {
      await axios.put(`/api/industries/${id}/risks/${updatedRisk.id}`, updatedRisk);
      fetchIndustry();
      setUpdatedRisk({
        id: '',
        riskName: '',
        description: '',
        identification: '',
        control: '',
        mitigation: ''
      });
      setSelectedRiskId(''); // Reset selected risk ID
    } catch (error) {
      console.error('Error updating risk:', error);
    }
  };

  const handleUpdateClick = (risk) => {
    setSelectedRiskId(risk.id);
    setUpdatedRisk({
      id: risk.id,
      riskName: risk.riskName,
      description: risk.description,
      identification: risk.identification,
      control: risk.control,
      mitigation: risk.mitigation
    });
  };

  const handleCancelUpdate = () => {
    setSelectedRiskId('');
    setUpdatedRisk({
      id: '',
      riskName: '',
      description: '',
      identification: '',
      control: '',
      mitigation: ''
    });
  };

  if (!industry) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1 className="text-center my-4">{industry.name}</h1>
      <p className="text-center">{industry.description}</p>
      <h2 className="my-4">Risks</h2>
      <Row>
        {industry.risks.map((risk) => (
          <Col xs={12} md={12} lg={12} key={risk.id} className="mb-4">
            <div className="p-3 border rounded" >
            
            <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Risk Name:</strong> {risk.riskName}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Description:</strong> {risk.description}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Identification:</strong> {risk.identification}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Control:</strong> {risk.control}
              </div>
              <div style={{ marginBottom: '10px', fontSize: '16px' }}>
                <strong>Mitigation:</strong> {risk.mitigation}
              </div>
              <Button variant="danger" onClick={() => deleteRisk(risk.id)}>Delete</Button>
              {selectedRiskId === risk.id ? (
                <>
                  <div className="mt-3">
                    <h4>Update Risk</h4>
                    <div>
                      <label>Risk Name</label>
                      <input
                        type="text"
                        placeholder="Risk Name"
                        value={updatedRisk.riskName}
                        onChange={(e) => setUpdatedRisk({ ...updatedRisk, riskName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Description</label>
                      <textarea
                        placeholder="Description"
                        value={updatedRisk.description}
                        onChange={(e) => setUpdatedRisk({ ...updatedRisk, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Identification</label>
                      <textarea
                        type="text"
                        placeholder="Identification"
                        value={updatedRisk.identification}
                        onChange={(e) => setUpdatedRisk({ ...updatedRisk, identification: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Control</label>
                      <textarea
                        type="text"
                        placeholder="Control"
                        value={updatedRisk.control}
                        onChange={(e) => setUpdatedRisk({ ...updatedRisk, control: e.target.value })}
                      />
                    </div>
                    <div>
                      <label>Mitigation</label>
                      <textarea
                        type="text"
                        placeholder="Mitigation"
                        value={updatedRisk.mitigation}
                        onChange={(e) => setUpdatedRisk({ ...updatedRisk, mitigation: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button variant="success" onClick={updateRisk} className="ml-2">Update</Button>
                  <Button variant="secondary" onClick={handleCancelUpdate} className="ml-2">Cancel</Button>
                </>
              ) : (
                <Button variant="primary" onClick={() => handleUpdateClick(risk)} className="ml-2">Update</Button>
              )}
            </div>
          </Col>
        ))}
      </Row>
      <div className="text-center my-4">
        <Link to={`/365risk/industry/${id}/addRisk`}>
          <Button variant="success">Add New Risk</Button>
        </Link>
      </div>
    </Container>
  );
};

export default IndustryDetails;
