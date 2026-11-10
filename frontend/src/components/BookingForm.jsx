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
    'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-cream placeholder:text-cream/25 transition-all duration-200 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/25';

  return (
    <section id="booking" className="relative bg-midnight-deep px-4 py-24 sm:py-28" ref={ref}>
      <div className="zulu-divider absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="eyebrow justify-center">
            <span className="eyebrow-rule rotate-180" />
            Invite us
            <span className="eyebrow-rule" />
          </span>
          <h2 className="section-title mt-5">Book Reality 7</h2>
          <p className="mx-auto mt-5 max-w-lg text-cream/55">
            Bring the ministry of Reality 7 to your church, concert, or event. Fill out the form below and
            we&apos;ll be in touch.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="surface space-y-5 p-6 sm:p-9"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
              <label htmlFor="email" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
              <label htmlFor="phone" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
              <label htmlFor="eventType" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
              <label htmlFor="eventDate" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
              <label htmlFor="location" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
            <label htmlFor="message" className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/45">
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
              className="flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-400/[0.08] p-4 text-sm text-green-300"
            >
              <CheckCircle size={18} aria-hidden="true" /> Booking request sent successfully! We&apos;ll be in
              touch.
            </div>
          )}
          {status === 'error' && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.08] p-4 text-sm text-red-300"
            >
              <AlertCircle size={18} aria-hidden="true" /> {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full py-4 text-[11px] disabled:cursor-not-allowed disabled:opacity-60"
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
