import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App2.css';

const Industries = () => {
    const [industries, setIndustries] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [editingIndustry, setEditingIndustry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            const response = await axios.get('/api/industries');
            setIndustries(response.data);
        } catch (error) {
            console.error('Error fetching industries:', error);
        }
    };

    const addIndustry = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('/api/industries', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchIndustries();
            setName('');
            setImage(null);
        } catch (error) {
            console.error('Error adding industry:', error);
        }
    };

    const deleteIndustry = async (id) => {
        try {
            await axios.delete(`/api/industries/${id}`);
            fetchIndustries();
        } catch (error) {
            console.error('Error deleting industry:', error);
        }
    };

    const startEditIndustry = (industry) => {
        setEditingIndustry(industry);
        setName(industry.name);
        setImage(null);
    };

    const updateIndustry = async () => {
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.put(`/api/industries/${editingIndustry.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchIndustries();
            setEditingIndustry(null);
            setName('');
            setImage(null);
        } catch (error) {
            console.error('Error updating industry:', error);
        }
    };

    const cancelEdit = () => {
        setEditingIndustry(null);
        setName('');
        setImage(null);
    };

    const filteredIndustries = industries.filter(industry =>
        industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Industry Manager</h1>
            <div className="form-container">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {editingIndustry ? (
                    <>
                        <button onClick={updateIndustry}>Update Industry</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button onClick={addIndustry}>Add Industry</button>
                )}
            </div>
            <input
                type="text"
                className="search-bar"
                placeholder="Search industries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="industry-list">
                {filteredIndustries.map((industry) => (
                    <div key={industry.id} className="industry-item">
                        <Link to={`/industries/${industry.id}`}>
                            <span>{industry.name}</span>
                        </Link>
                        {industry.imagePath && (
                            <img src={`${process.env.PUBLIC_URL}/${industry.imagePath}`} alt={industry.name} className="industry-image"/>
                        )}
                        <div className="button-group">
                            <button onClick={() => deleteIndustry(industry.id)}>Delete</button>
                            <button onClick={() => startEditIndustry(industry)}>Edit</button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Industries;
