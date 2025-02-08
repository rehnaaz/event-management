import React from 'react';
import EventCard from '../components/EventCard';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

const Home = () => {
  const events = [
    {
      title: 'Event 1',
      description: 'This is a description for event 1.',
      image: 'https://via.placeholder.com/400',
    },
    {
      title: 'Event 2',
      description: 'This is a description for event 2.',
      image: 'https://via.placeholder.com/400',
    },
    {
      title: 'Event 3',
      description: 'This is a description for event 3.',
      image: 'https://via.placeholder.com/400',
    },
  ];

  return (
    <div>
      <Navbar />
      <Hero />
      <section id="events" style={styles.eventsSection}>
        <div style={styles.container}>
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              image={event.image}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
  eventsSection: {
    padding: '40px 20px',
    backgroundColor: '#f9f9f9',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
};

export default Home;
