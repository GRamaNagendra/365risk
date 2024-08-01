import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api'; // Ensure this API path is correct
import './Userinterface.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

const HtmlContent = ({ industryName }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`https://redesigned-robot-4jgp7rv5jwq93546-8080.app.github.dev/html/${industryName}.html`);


       
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchContent();
  }, [industryName]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const Userinterface = () => {
  const [industries, setIndustries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

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

  const filteredIndustries = industries.filter(industry =>
    industry.name.includes(searchQuery) // Removed lowercase conversion
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIndustries.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLoadMore = () => {
    if (indexOfLastItem < filteredIndustries.length) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container2">
      <h1 className="industry-title">
        Discover Leading Innovations in Industries
      </h1>
      <div className="search-container">
        <input
          id="search-input"
          type="text"
          placeholder="Search industries..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <ul className="industry-list">
        {currentItems.map((industry) => (
          <li key={industry.id} className="industry-item">
            <Link to={`/uindustry/${industry.id}`} className="industry-link">
              <div className="industry-box">
                <img
                 src={`https://raw.githubusercontent.com/365risk/EnterValues/main/src/main/resources/images/${industry.imagePath}`} 
          
                  alt={industry.name}
                  className="industry-image"
                />
                <h3 className="industry-title">
                  {industry.name}
                </h3>
                <div className="industry-content">
                  <HtmlContent industryName={industry.name} />
                  <button className="show-risks-button">Show Risks</button>
                  <div className="tooltip">Detailed Information</div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {[...Array(Math.ceil(filteredIndustries.length / itemsPerPage)).keys()].map(number => (
          <a
            key={number}
            href="#"
            onClick={() => handlePageClick(number + 1)}
            className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}
          >
            {number + 1}
          </a>
        ))}
      </div>
      <button onClick={handleLoadMore} className="load-more-button">
        Load More
      </button>
    </div>
  );
};

export default Userinterface;
