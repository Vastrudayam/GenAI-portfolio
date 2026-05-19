import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/WhatsApp Image 2026-05-10 at 11.12.58 PM.jpeg';
import ApplyModal from './ApplyModal';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Courses', href: '/#courses' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-default'}`}>
      <div className="container nav-container">
        <Link to="/" className="logo-link">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="logo-wrapper">
              <img src={logo} alt="GenAI Logo" className="logo-img" />
            </div>
            <span className="brand-name">NextGen</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-menu">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="nav-item"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <div className="nav-actions">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="join-btn desktop-only"
            onClick={() => setIsJoinOpen(true)}
          >
            Join Now
          </motion.button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="mobile-toggle">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="mobile-menu container">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-item"
                >
                  {link.name}
                </a>
              ))}
              <button 
                className="join-btn w-full"
                onClick={() => {
                  setIsOpen(false);
                  setIsJoinOpen(true);
                }}
              >
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    <AnimatePresence>
      {isJoinOpen && <ApplyModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />}
    </AnimatePresence>
    </>
  );
};

export default Navbar;
