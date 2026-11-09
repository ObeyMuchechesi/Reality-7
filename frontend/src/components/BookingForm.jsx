import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import api, { getApiErrorMessage } from '../lib/api';

const EVENT_TYPES = ['Concert', 'Church Service', 'Private Event', 'Corporate', 'Festival'];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  eventType: 'Concert',
  eventDate: '',
  location: '',
  message: '',
};

const today = new Date().toISOString().split('T')[0];

const BookingForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setStatus(null);
    setErrorMessage('');

    try {
      await api.post('/bookings', formData);
      setStatus('success');
      setFormData(emptyForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-cream/5 border border-gold/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200';

  return (
    <section id="booking" className="py-24 px-4 bg-midnight relative" ref={ref}>
      <div className="zulu-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold tracking-[0.25em] uppercase text-xs font-bold">Invite Us</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-cream mt-3">Book Reality 7</h2>
          <p className="text-cream/50 mt-4 max-w-lg mx-auto">
            Bring the ministry of Reality 7 to your church, concert, or event. Fill out the form below and
            we&apos;ll be in touch.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5 p-6 sm:p-8 bg-cream/[0.03] rounded-3xl border border-gold/10"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-cream/70 mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={120}
                autoComplete="name"
                placeholder="Your name"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cream/70 mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@email.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-cream/70 mb-2">
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={40}
                autoComplete="tel"
                placeholder="+27 ..."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-cream/70 mb-2">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={inputClass}
              >
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-midnight text-cream">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-cream/70 mb-2">
                Event Date *
              </label>
              <input
                id="eventDate"
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={today}
                required
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-cream/70 mb-2">
                Location *
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                maxLength={200}
                placeholder="City, Country"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-cream/70 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              maxLength={2000}
              placeholder="Tell us more about your event..."
              className={inputClass}
            />
          </div>

          {status === 'success' && (
            <div
              role="status"
              className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 p-4 rounded-xl"
            >
              <CheckCircle size={18} aria-hidden="true" /> Booking request sent successfully! We&apos;ll be in
              touch.
            </div>
          )}
          {status === 'error' && (
            <div
              role="alert"
              className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-4 rounded-xl"
            >
              <AlertCircle size={18} aria-hidden="true" /> {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gold text-midnight font-bold rounded-xl hover:bg-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold/20"
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                <Send size={18} aria-hidden="true" /> Send Booking Request
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingForm;
