import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Layers, Users, Mail, Rss, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import ApplyModal from './ApplyModal';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // State to track current theme mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update body element classes when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close menus on path change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setDropdownActive(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const targetId = path.substring(2);
      
      if (location.pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      <header className={`main-header ${scrolled ? 'header-scrolled' : 'header-default'}`}>
        <Link to="/" className="logo-wrapper">
          <Logo size="sm" />
        </Link>

        {/* Overlay backdrop for mobile drawer */}
        <div 
          className={`nav-overlay ${isOpen ? 'active' : ''}`} 
          onClick={() => setIsOpen(false)}
        />

        {/* Navigation Menu Links */}
        <nav className={`nav-container ${isOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li className="dropdown-li">
              <a 
                href="#" 
                className="nav-link-item dropdown-toggle" 
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownActive(!dropdownActive);
                }}
              >
                <Layers className="nav-icon" size={16} />
                Our Stacks
                <ChevronDown className={`dropdown-chevron ${dropdownActive ? 'rotate' : ''}`} size={14} />
              </a>
              
              <ul className={`nav-dropdown-content ${dropdownActive ? 'active' : ''}`}>
                <li>
                  <Link to="/fullstack-syllabus" className="dropdown-link-item">
                    Full Stack Development
                  </Link>
                </li>
                <li>
                  <Link to="/course/genai" className="dropdown-link-item">
                    GenAI & Machine Learning
                  </Link>
                </li>
                <li>
                  <Link to="/course/marketing" className="dropdown-link-item">
                    Digital Marketing
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link 
                to="/blog" 
                className="nav-link-item"
              >
                <Rss className="nav-icon" size={16} />
                Blog
              </Link>
            </li>
            <li>
              <a 
                href="/#about" 
                onClick={(e) => {
                  handleNavClick(e, '/#about');
                  setIsOpen(false);
                }}
                className="nav-link-item"
              >
                <Users className="nav-icon" size={16} />
                Why Us
              </a>
            </li>
            <li>
              <a 
                href="/#contact" 
                onClick={(e) => {
                  handleNavClick(e, '/#contact');
                  setIsOpen(false);
                }}
                className="nav-link-item"
              >
                <Mail className="nav-icon" size={16} />
                Contact
              </a>
            </li>
          </ul>

          <button 
            className="cta-btn mobile-cta" 
            onClick={() => {
              setIsOpen(false);
              setIsJoinOpen(true);
            }}
          >
            Apply Now
          </button>
        </nav>

        <div className="header-actions">
          {/* Theme Toggler Button */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button 
            className="cta-btn desktop-cta" 
            onClick={() => setIsJoinOpen(true)}
          >
            Apply Now
          </button>
          
          <button 
            className={`hamburger-menu ${isOpen ? 'active' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isJoinOpen && (
          <ApplyModal 
            isOpen={isJoinOpen} 
            onClose={() => setIsJoinOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
