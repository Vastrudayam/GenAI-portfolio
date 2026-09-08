import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo-wrapper">
              <Logo size="md" />
            </div>
            <p>
              Master the code. Build the future. We provide premium, industry-aligned training and internship paths to help you land your dream tech job.
            </p>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube"></i></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: '700' }}>WhatsApp/Call:</span>
                <a href="tel:+917993971574" style={{ color: '#f8fafc', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'} onMouseLeave={(e) => e.target.style.color = '#f8fafc'}>+91 79939 71574</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/#home">Home</Link></li>
              <li><Link to="/#courses">All Courses</Link></li>
              <li><Link to="/#about">Why Choose Us</Link></li>
              <li><Link to="/#testimonials">Success Stories</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/blog">Tech Blog</Link></li>
              <li><Link to="/#contact">Contact Support</Link></li>
              <li><a href="#">Hire From Us</a></li>
              <li><a href="#">Help & FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest coding tips, tech news, and course discounts.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NextGen Technology Pvt. Ltd. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
