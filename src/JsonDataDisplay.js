import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await api.get('/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const addContact = async () => {
        const newContact = { name, number };
        try {
            await api.post('/contacts', newContact);
            fetchContacts();  // Refresh the contact list
            setName('');      // Clear the name input
            setNumber('');    // Clear the number input
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await api.delete(`/contacts/${id}`);
            fetchContacts();  // Refresh the contact list
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const startEditContact = (contact) => {
        setEditingContact(contact);
        setName(contact.name);
        setNumber(contact.number);
    };

    const updateContact = async () => {
        const updatedContact = { id: editingContact.id, name, number };
        try {
            await api.put(`/contacts/${editingContact.id}`, updatedContact);
            fetchContacts();  // Refresh the contact list
            setEditingContact(null);
            setName('');      // Clear the name input
            setNumber('');    // Clear the number input
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const cancelEdit = () => {
        setEditingContact(null);
        setName('');
        setNumber('');
    };

    return (
        <div>
            <h1>Contact Manager</h1>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
                {editingContact ? (
                    <>
                        <button onClick={updateContact}>Update Contact</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </>
                ) : (
                    <button onClick={addContact}>Add Contact</button>
                )}
            </div>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        {contact.name}: {contact.number}
                        <button onClick={() => deleteContact(contact.id)}>Delete</button>
                        <button onClick={() => startEditContact(contact)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
