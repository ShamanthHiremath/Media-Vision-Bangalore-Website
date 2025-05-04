import React, { useEffect, useState } from 'react';
import EventForm from '../components/EventForm';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    date: '',
    venue: '',
    photos: '', // comma separated URLs
    description: ''
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Handle event creation
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('date', form.date);
      formData.append('venue', form.venue);
      formData.append('description', form.description);
      selectedFiles.forEach((file) => {
        formData.append('photos', file);
      });
      const res = await fetch('http://localhost:5000/events', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setEvents([data, ...events]);
        setShowForm(false);
        setForm({ name: '', date: '', venue: '', photos: '', description: '' });
        setSelectedFiles([]);
      } else {
        setFormError(data.error || 'Failed to create event');
      }
    } catch (err) {
      setFormError('Failed to create event');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard - Events</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={() => setShowForm(true)}
        >
          + Create Event
        </button>
      </div>
      {loading ? (
        <div>Loading events...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="space-y-4">
          {events.length === 0 ? (
            <div>No events found.</div>
          ) : (
            events.map(event => (
              <div key={event._id} className="border rounded p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    <div className="text-gray-600 text-sm">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="text-gray-600 text-sm">Venue: {event.venue}</div>
                  </div>
                  {event.photos && event.photos.length > 0 && (
                    <img src={event.photos[0]} alt="event" className="w-24 h-16 object-cover rounded" />
                  )}
                </div>
                <div className="mt-2 text-gray-700">{event.description}</div>
              </div>
            ))
          )}
        </div>
      )}
      {/* Event Creation Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Create New Event</h3>
            <EventForm
              form={form}
              onChange={handleChange}
              onFileChange={handleFileChange}
              onSubmit={handleCreateEvent}
              loading={formLoading}
              error={formError}
              onCancel={() => setShowForm(false)}
              selectedFiles={selectedFiles}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 