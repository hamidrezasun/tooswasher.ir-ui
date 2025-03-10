/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getEvents, createEvent, createEventActivity } from '../api/api';
import { containerStyles } from './style';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((err) => setError(err.message || 'خطا در بارگذاری رویدادها'));
  }, []);

  const handleAddEvent = async () => {
    try {
      const newEvent = await createEvent({ name: 'رویداد جدید', description: '' });
      setEvents([...events, newEvent]);
    } catch (err) {
      setError(err.message || 'خطا در افزودن رویداد');
    }
  };

  const handleEventActivity = async (eventId) => {
    try {
      await createEventActivity(eventId, { content: 'فعالیت جدید', important: false });
      console.log(`Activity created for event ${eventId}`);
      // Optionally refresh events to reflect the new activity
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);
    } catch (err) {
      setError(err.message || 'خطا در فعال‌سازی رویداد');
    }
  };

  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <div css={containerStyles}>
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">رویدادها</h1>
          <button
            onClick={handleAddEvent}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            افزودن رویداد
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-right">نام</th>
                <th className="p-3 text-right">توضیحات</th>
                <th className="p-3 text-right">اقدامات</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-3">{event.subject || 'بدون عنوان'}</td>
                  <td className="p-3">{event.description || 'بدون توضیحات'}</td>
                  <td className="p-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventActivity(event.id);
                      }}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      فعال‌سازی
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;