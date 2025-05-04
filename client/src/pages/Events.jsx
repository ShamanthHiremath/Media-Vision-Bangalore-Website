import React, { useState } from 'react';

// Dummy data for events
const dummyEvents = [
  {
    _id: '1',
    name: 'Annual Gala',
    date: '2024-07-01',
    venue: 'Grand Hall',
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    ],
    description: 'A grand annual gala with music, food, and fun for all ages! Join us for a night to remember.',
  },
  {
    _id: '2',
    name: 'Tech Conference',
    date: '2024-08-15',
    venue: 'Tech Park',
    photos: [
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    ],
    description: 'A conference for tech enthusiasts, featuring talks, workshops, and networking opportunities.',
  },
  {
    _id: '3',
    name: 'Art Expo',
    date: '2024-09-10',
    venue: 'City Gallery',
    photos: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    ],
    description: 'An exhibition of modern art from local and international artists. Explore creativity and inspiration.',
  },
];

const Events = () => {
  const [selectedEventId, setSelectedEventId] = useState(dummyEvents[0]._id);
  const selectedEvent = dummyEvents.find(e => e._id === selectedEventId);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  // Auto-move carousel
  React.useEffect(() => {
    if (!selectedEvent || !autoPlay) return;
    const interval = setInterval(() => {
      setCarouselIdx((idx) =>
        (idx + 1) % (selectedEvent.photos.length || 1)
      );
    }, 2500);
    return () => clearInterval(interval);
  }, [selectedEvent, autoPlay]);

  // Reset carousel index when event changes
  React.useEffect(() => {
    setCarouselIdx(0);
    setAutoPlay(true);
  }, [selectedEventId]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Events</h2>
      {/* Event Grid */}
      {showGrid && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {dummyEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
              onClick={() => { setSelectedEventId(event._id); setShowGrid(false); }}
            >
              <img
                src={event.photos[0]}
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{event.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Full Event Info */}
      {!showGrid && selectedEvent && (
        <>
          <button
            className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 font-semibold"
            onClick={() => setShowGrid(true)}
          >
            &larr; Back to Events
          </button>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            {/* Carousel for images */}
            <div className="relative w-full flex flex-col items-center mb-6">
              <div className="relative w-full max-w-3xl h-[420px] flex items-center justify-center mx-auto">
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-blue-100 z-10"
                  onClick={() => {
                    setAutoPlay(false);
                    setCarouselIdx((carouselIdx - 1 + selectedEvent.photos.length) % selectedEvent.photos.length);
                  }}
                >
                  &#8592;
                </button>
                <img
                  src={selectedEvent.photos[carouselIdx]}
                  alt={selectedEvent.name}
                  className="object-cover h-[400px] w-full rounded-lg shadow-lg transition-all duration-500"
                  style={{ maxWidth: '100%' }}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow hover:bg-blue-100 z-10"
                  onClick={() => {
                    setAutoPlay(false);
                    setCarouselIdx((carouselIdx + 1) % selectedEvent.photos.length);
                  }}
                >
                  &#8594;
                </button>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                {selectedEvent.photos.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-4 h-4 rounded-full border-2 ${idx === carouselIdx ? 'bg-blue-600 border-blue-600' : 'bg-gray-200 border-gray-400'}`}
                    onClick={() => {
                      setAutoPlay(false);
                      setCarouselIdx(idx);
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Event details below carousel */}
            <div className="px-2">
              <h3 className="text-3xl font-bold mb-2 text-gray-800">{selectedEvent.name}</h3>
              <div className="flex flex-wrap gap-6 mb-2 text-lg text-gray-600">
                <span>Date: {new Date(selectedEvent.date).toLocaleDateString()}</span>
                <span>Venue: {selectedEvent.venue}</span>
              </div>
              <div className="text-gray-700 mt-4 whitespace-pre-line text-lg">{selectedEvent.description}</div>
            </div>
          </div>
          {/* Other Events Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Other Events</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {dummyEvents.filter(e => e._id !== selectedEventId).map(event => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
                  onClick={() => { setSelectedEventId(event._id); setCarouselIdx(0); setAutoPlay(true); }}
                >
                  <img
                    src={event.photos[0]}
                    alt={event.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{event.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Events; 