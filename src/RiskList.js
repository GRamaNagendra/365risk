import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './RiskList.css';

const RiskList = () => {
    const { industryId } = useParams();
    const [industry, setIndustry] = useState(null);

    useEffect(() => {
        const fetchIndustry = async () => {
            try {
                const response = await axios.get(`/api/industries/${industryId}`);
                setIndustry(response.data);
            } catch (error) {
                console.error('Error fetching industry:', error);
            }
        };

        fetchIndustry();
    }, [industryId]);

    if (!industry) {
        return <h2>Industry not found</h2>;
    }

    return (
        <div className="risk-container">
            <h2>{industry.name} - Risks</h2>
            <Link to={`/add-risk/${industry.id}`} className="add-risk-button">Add Risk</Link>
            <ul className="risk-list">
                {industry.risks.map((risk) => (
                    <li key={risk.id} className="risk-item">
                        <h3>{risk.name}</h3>
                        <p><strong>Description:</strong> {risk.description}</p>
                        <p><strong>Identification:</strong> {risk.identification}</p>
                        <p><strong>Control:</strong> {risk.control}</p>
                        <p><strong>Mitigation:</strong> {risk.mitigation}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RiskList;
