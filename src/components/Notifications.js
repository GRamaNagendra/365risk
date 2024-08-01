import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f7f9fc',
        border: '1px solid #d6d9e6',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '1200px',
        margin: '20px auto',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        marginTop: '0',
        fontSize: '2.5em',
        color: '#2e3a59',
        borderBottom: '4px solid #007bff',
        paddingBottom: '15px',
        marginBottom: '30px',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '1px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    notificationContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    notification: {
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #d6d9e6',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    },
    notificationHover: {
        backgroundColor: '#eaf2f7',
        transform: 'scale(1.02)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    notificationLast: {
        borderLeftColor: '#007bff',
        backgroundColor: '#eaf2f7',
        animation: 'pulse 1.5s infinite',
    },
    image: {
        width: '90px',
        height: '90px',
        marginRight: '20px',
        borderRadius: '12px',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        border: '2px solid #d6d9e6',
    },
    imageHover: {
        transform: 'scale(1.05)',
        borderColor: '#007bff',
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        color: '#2e3a59',
    },
    title: {
        fontSize: '1.5em',
        color: '#007bff',
        fontWeight: 'bold',
        marginBottom: '8px',
        lineHeight: '1.2',
    },
    description: {
        color: '#545b62',
        fontSize: '1.1em',
        margin: '0',
        lineHeight: '1.4',
    },
    noData: {
        textAlign: 'center',
        color: '#6c757d',
        padding: '20px',
        fontSize: '1.2em',
        fontStyle: 'italic',
    },
    footer: {
        marginTop: '40px',
        textAlign: 'center',
        color: '#999999',
        fontSize: '0.9em',
        padding: '10px',
        borderTop: '1px solid #d6d9e6',
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '20px',
        paddingBottom: '30px',
    },
    pageButton: {
        padding: '10px 20px',
        border: '1px solid #d6d9e6',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        fontSize: '1em',
        color: '#007bff',
        fontWeight: '600',
    },
    pageButtonActive: {
        backgroundColor: '#007bff',
        color: '#ffffff',
        borderColor: '#007bff',
    },
    pageButtonDisabled: {
        backgroundColor: '#f0f0f0',
        color: '#b5b5b5',
        cursor: 'not-allowed',
    },
    loadingSpinner: {
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        margin: '20px auto',
    },
    '@keyframes pulse': {
        '0%': { opacity: 1 },
        '50%': { opacity: 0.8 },
        '100%': { opacity: 1 },
    },
    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
    },
    '@media (max-width: 768px)': {
        container: {
            padding: '15px',
        },
        heading: {
            fontSize: '2em',
        },
        notification: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        image: {
            width: '70px',
            height: '70px',
            marginBottom: '10px',
        },
        message: {
            alignItems: 'flex-start',
        },
    },
};

const baseURL = 'https://fantastic-halibut-6jqrr9v54q7f4jww-8080.app.github.dev/';

const Notifications = () => {
    const [industries, setIndustries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchIndustries = async () => {
        try {
            const response = await api.get('/api/industries');
            setIndustries(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching industries.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIndustries();
    }, []);

    const indexOfLastIndustry = currentPage * itemsPerPage;
    const indexOfFirstIndustry = indexOfLastIndustry - itemsPerPage;
    const currentIndustries = industries.slice(indexOfFirstIndustry, indexOfLastIndustry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Notifications</h2>
            {loading && <div style={styles.loadingSpinner}></div>}
            {error && <div style={styles.noData}>{error}</div>}
            {!loading && !error && (
                <div style={styles.notificationContainer}>
                    {currentIndustries.length > 0 ? (
                        currentIndustries.map((industry) => (
                            <div
                                key={industry.id}
                                style={{
                                    ...styles.notification,
                                    ...(industries[0].id === industry.id ? styles.notificationLast : {}),
                                }}
                            >
                                {industry.imagePath && (
                                    <img
                                        src={`${baseURL}${industry.imagePath}`}
                                        alt={`Image for ${industry.name}`}
                                        style={styles.image}
                                    />
                                )}
                                <div style={styles.message}>
                                    <div style={styles.title}>{industry.name}</div>
                                    <p style={styles.description}>{industry.description}</p>
                                    <Link
                                        to={`/uindustry/${industry.id}`}
                                        style={styles.riskLink}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={styles.noData}>No notifications available</div>
                    )}
                </div>
            )}
            <div style={styles.pagination}>
                <button
                    style={{
                        ...styles.pageButton,
                        ...(currentPage === 1 ? styles.pageButtonDisabled : {}),
                    }}
                    onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {Array.from(
                    { length: Math.ceil(industries.length / itemsPerPage) },
                    (_, index) => (
                        <button
                            key={index + 1}
                            style={{
                                ...styles.pageButton,
                                ...(currentPage === index + 1 ? styles.pageButtonActive : {}),
                            }}
                            onClick={() => paginate(index + 1)}
                        >
                            {index + 1}
                        </button>
                    )
                )}
                <button
                    style={{
                        ...styles.pageButton,
                        ...(currentPage === Math.ceil(industries.length / itemsPerPage)
                            ? styles.pageButtonDisabled
                            : {}),
                    }}
                    onClick={() => currentPage < Math.ceil(industries.length / itemsPerPage) && paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(industries.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
            <div style={styles.footer}>Notification Page</div>
        </div>
    );
};

export default Notifications;
