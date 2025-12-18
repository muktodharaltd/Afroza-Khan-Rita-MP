

'use client';

import React, { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_DATABASE_URL || '';

export default function UpdatesSectionExpandable() {
  const [events, setEvents] = useState([]);
  const [womenNotices, setWomenNotices] = useState([]);
  const [topNotice, setTopNotice] = useState(null);
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [expandedWomen, setExpandedWomen] = useState([]);

  useEffect(() => {
    if (!API_BASE) return;

    const fetchData = async () => {
      try {
        const [eventsRes, womenRes] = await Promise.all([
          fetch(`${API_BASE}/api/events`),
          fetch(`${API_BASE}/api/woman-notices`)
        ]);

        const eventsData = await eventsRes.json();
        const womenData = await womenRes.json();

        if (eventsData.success) {
          setEvents(eventsData.data || []);
          setTopNotice(eventsData.data?.[0] || null);
        }

        if (womenData.success) {
          setWomenNotices(womenData.data || []);
        }

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const toggleEvent = (id) => {
    setExpandedEvents(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleWomenNotice = (id) => {
    setExpandedWomen(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="w-full bg-white py-8 p-4 shadow-sm">
      <div className="max-w-7xl mx-auto">

        {/* Top Notice */}
        {topNotice && (
          <div className="mb-6 shadow-lg p-5 md:p-6 rounded-lg border border-brandGreen" style={{ backgroundColor: 'rgba(13, 132, 72, 0.08)' }}>
            <h3 className="text-brandGreen font-semibold text-lg">{topNotice.title}</h3>
            <p className="text-xs text-brandGreen">{new Date(topNotice.date).toLocaleDateString('bn-BD')}</p>
            <p className="mt-2">{topNotice.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Events */}
          <div>
            <h4 className="text-brandGreen text-lg font-semibold mb-3">আসন্ন ইভেন্ট</h4>
            <div className="bg-white border border-brandGray rounded-lg shadow divide-y divide-brandGray">
              {events.length === 0 && <p className="p-4 text-sm text-brandGray">কোনো ইভেন্ট পাওয়া যায়নি</p>}
              {events.map(event => (
                <div key={event.id} className="p-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleEvent(event.id)}>
                    <h5 className="text-brandGreen font-medium">{event.title}</h5>
                    <span className="text-sm text-brandGreen">{expandedEvents.includes(event.id) ? 'বন্ধ' : 'পড়ুন'}</span>
                  </div>
                  <p className="text-xs text-brandGreen">{new Date(event.date).toLocaleDateString('bn-BD')}</p>
                  {expandedEvents.includes(event.id) && (
                    <div className="mt-2 text-gray-700">{event.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Women Notices */}
          <div>
            <h4 className="text-brandGreen text-lg font-semibold mb-3">নারী বিষয়ক বিজ্ঞপ্তি</h4>
            <div className="bg-white border border-brandGray rounded-lg shadow divide-y divide-brandGray">
              {womenNotices.length === 0 && <p className="p-4 text-sm text-brandGray">কোনো নারী বিষয়ক বিজ্ঞপ্তি নেই</p>}
              {womenNotices.map(notice => (
                <div key={notice.id} className="p-4">
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleWomenNotice(notice.id)}>
                    <h5 className="text-brandGreen font-medium">{notice.title}</h5>
                    <span className="text-sm text-brandGreen">{expandedWomen.includes(notice.id) ? 'বন্ধ' : 'পড়ুন'}</span>
                  </div>
                  <p className="text-xs text-brandGreen">{new Date(notice.date).toLocaleDateString('bn-BD')}</p>
                  {expandedWomen.includes(notice.id) && (
                    <div className="mt-2 text-gray-700">{notice.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
