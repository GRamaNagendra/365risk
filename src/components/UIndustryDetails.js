import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api'; // Adjust the path if needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

const Risks = () => {
  const [industries, setIndustries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIndustries, setFilteredIndustries] = useState([]);

  useEffect(() => {
    fetchIndustries();
  }, []);

  useEffect(() => {
    filterIndustries();
  }, [searchQuery, industries]);

  const fetchIndustries = async () => {
    try {
      const response = await api.get('/api/industries');
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const filterIndustries = () => {
    const query = searchQuery.toLowerCase();
    const filtered = industries.filter(industry =>
      industry.name.toLowerCase().includes(query)
    );
    setFilteredIndustries(filtered);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Risks</h1>

      <div style={styles.searchContainer}>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search Industries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <ul className="industry-list" style={styles.industryList}>
        {filteredIndustries.map((industry) => (
          <li key={industry.id} style={styles.listItem}>
            <Link to={`/industry/${industry.id}`} style={styles.link}>
              {industry.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '90%',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '2em',
    fontWeight: '700',
    marginBottom: '20px',
  },
  searchContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
   
    margin: '0 auto 20px auto',
  },
  searchInput: {
    width: '100%',
    padding: '12px 40px 12px 15px', // Added extra padding for the icon
    fontSize: '1em',
    height:'50px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    fontSize: '1.2em',
    color: '#aaa',
    pointerEvents: 'none', // Make sure icon does not block input text
  },
  industryList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    marginBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '1.2em',
  },
};

export default Risks;
