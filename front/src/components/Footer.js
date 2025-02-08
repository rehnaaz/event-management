import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>
      <a href="/terms" style={styles.link}>Terms of Service</a>
      <a href="/contact" style={styles.link}>Contact</a>
      <p>Follow us on social media!</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
  },
};

export default Footer;
