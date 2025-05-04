import React from 'react';

const EventForm = ({ form, onChange, onFileChange, onSubmit, loading, error, onCancel, selectedFiles = [] }) => (
  <form onSubmit={onSubmit} className="space-y-6 text-lg">
    <div>
      <label className="block mb-2 font-semibold text-xl">Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={onChange}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <label className="block mb-2 font-semibold text-xl">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={onChange}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="flex-1">
        <label className="block mb-2 font-semibold text-xl">Venue</label>
        <input
          type="text"
          name="venue"
          value={form.venue}
          onChange={onChange}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
    </div>
    <div>
      <label className="block mb-2 font-semibold text-xl">Photos (upload images)</label>
      <div className="border-2 border-dashed border-blue-400 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition">
        <input
          type="file"
          name="photos"
          multiple
          accept="image/*"
          onChange={onFileChange}
          className="w-full text-lg mb-2"
          style={{ display: 'block' }}
        />
        <span className="text-blue-600">Drag and drop or click to select images</span>
        {selectedFiles && selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {selectedFiles.map((file, idx) => (
              <div key={idx} className="w-24 h-24 rounded overflow-hidden border border-gray-300 bg-white flex items-center justify-center">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full"
                  onLoad={e => URL.revokeObjectURL(e.target.src)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <div>
      <label className="block mb-2 font-semibold text-xl">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={5}
        required
      />
    </div>
    {error && <div className="text-red-600 text-lg text-center">{error}</div>}
    <div className="flex gap-4 mt-6">
      <button
        type="submit"
        className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Event'}
      </button>
      {onCancel && (
        <button
          type="button"
          className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg text-xl font-semibold hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);

export default EventForm; 