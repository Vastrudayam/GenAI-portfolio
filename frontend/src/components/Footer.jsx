import React from 'react';
import logo from '../assets/WhatsApp Image 2026-05-10 at 11.12.58 PM.jpeg';
import './Footer.css';

const Footer = () => {
  const socialLinks = [
    { icon: 'bi-twitter-x', href: '#' },
    { icon: 'bi-github', href: '#' },
    { icon: 'bi-linkedin', href: '#' },
    { icon: 'bi-instagram', href: '#' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-wrapper">
              <div className="footer-logo-box">
                <img src={logo} alt="GenAI Logo" className="footer-logo-img" />
              </div>
              <span className="footer-brand-name">NextGen</span>
            </div>
            <p className="footer-brand-desc">
              Empowering the next generation of tech leaders through industry-led internship programs.
            </p>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h4 className="footer-heading">Contact Us</h4>
            <a 
              href="https://wa.me/917993971574" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-phone"
            >
              +91 79939 71574
            </a>
            <p className="footer-whatsapp-note">Available on WhatsApp 24/7</p>
          </div>

          {/* Social Section */}
          <div className="footer-social">
            <h4 className="footer-heading">Follow Us</h4>
            <div className="social-links-wrapper">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="social-link"
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GenAI Training Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
