import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Music from './components/Music';
import TourDates from './components/TourDates';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Music />
        <TourDates />
        <Gallery />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
