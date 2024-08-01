import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    padding: '20px',
    maxWidth: '1000px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  title: {
    color: '#2c3e50',
    fontSize: '2.4em',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1.2em',
    color: '#34495e',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  searchContainer: {
    flex: '1',
    marginRight: '20px',
  },
  searchInput: {
    padding: '12px',
    width: '100%',
    height:'60px',
    border: '2px solid #3498db',
    borderRadius: '8px',
    fontSize: '1em',
    boxSizing: 'border-box',
  },
  sortContainer: {
    marginTop:'-8px',
    flex: '0 0 200px',
  },
  sortSelect: {
    padding: '10px',
    border: '1px solid #3498db',
    borderRadius: '4px',
    fontSize: '1em',
    width: '100%',
  },
  riskList: {
    listStyle: 'none',
    padding: '0',
  },
  riskItem: {
    marginBottom: '12px',
  },
  riskLink: {
    textDecoration: 'none',
    color: '#3498db',
    fontWeight: 'bold',
  },
  riskLinkHover: {
    textDecoration: 'underline',
  },
  pagination: {
    marginTop: '20px',
    textAlign: 'center',
  },
  pageButton: {
    border: '1px solid #3498db',
    backgroundColor: '#fff',
    color: '#3498db',
    padding: '10px 15px',
    margin: '0 5px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pageButtonActive: {
    backgroundColor: '#3498db',
    color: '#fff',
  },
  backButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '1em',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: '#666',
  },
};

const IndustryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [industry, setIndustry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedRisk, setExpandedRisk] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchIndustry();
  }, [id]);

  const fetchIndustry = async () => {
    try {
      const response = await api.get(`/api/industries/${id}`);
      setIndustry(response.data);
    } catch (error) {
      console.error('Error fetching industry:', error);
    }
  };

  if (!industry) {
    return <div style={styles.loading}>Loading...</div>;
  }

  const filteredRisks = industry.risks.filter(risk =>
    risk.riskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRisks = filteredRisks.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.riskName.localeCompare(b.riskName);
    } else {
      return b.riskName.localeCompare(a.riskName);
    }
  });

  const indexOfLastRisk = currentPage * itemsPerPage;
  const indexOfFirstRisk = indexOfLastRisk - itemsPerPage;
  const currentRisks = sortedRisks.slice(indexOfFirstRisk, indexOfLastRisk);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleExpandRisk = (riskId) => {
    setExpandedRisk(expandedRisk === riskId ? null : riskId);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate('/industries')}>Back to List</button>
      <h1 style={styles.title}>{industry.name}</h1>
      <p style={styles.description}>{industry.description}</p>

      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            style={styles.searchInput}
            placeholder="Search risks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={styles.sortContainer}>
          <label>Sort by:</label>
          <select
            style={styles.sortSelect}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {filteredRisks.length > 0 ? (
        <>
          <ul style={styles.riskList}>
            {currentRisks.map((risk) => (
              <li key={risk.id} style={styles.riskItem}>
                <div>
                  <Link
                    to={`/industry/${id}/risk/${risk.id}`}
                    style={styles.riskLink}
                    onClick={() => handleExpandRisk(risk.id)}
                  >
                    {risk.riskName}
                  </Link>
                  {expandedRisk === risk.id && (
                    <div>
                      <p>{risk.details}</p> {/* Example of additional risk details */}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.pagination}>
            {Array.from({ length: Math.ceil(filteredRisks.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                style={{
                  ...styles.pageButton,
                  ...(currentPage === index + 1 ? styles.pageButtonActive : {}),
                }}
                onClick={() => paginate(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No risks found</p>
      )}
    </div>
  );
};

export default IndustryDetails;
