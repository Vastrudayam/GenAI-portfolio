import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ApplyModal = ({ isOpen, onClose, courseTitle = "" }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    number: '', 
    course: courseTitle || 'Select a course' 
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Update course when courseTitle prop changes
  useEffect(() => {
    if (courseTitle) {
      setFormData(prev => ({ ...prev, course: courseTitle }));
    }
  }, [courseTitle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello! I am interested in the ${formData.course} internship course. %0A%0AName: ${formData.name}%0APhone: ${formData.number}`;
    const whatsappUrl = `https://wa.me/917993971574?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full p-8 sm:p-10"
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
          position: 'relative',
          maxWidth: '400px',
          margin: 'auto',
          display: 'block',
          padding: '2.5rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          style={{ 
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            border: 'none', 
            background: 'rgba(0,0,0,0.05)', 
            fontSize: '1.25rem', 
            cursor: 'pointer', 
            color: '#94a3b8',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s',
            zIndex: 10
          }}
        >&times;</button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e293b', margin: 0 }}>Join Our Program</h3>
          <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>Secure your internship spot today</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '0.5rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
            <input 
              required 
              type="text" 
              className="form-input"
              style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem', textAlign: 'center' }} 
              placeholder="Enter your name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '0.5rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
            <input 
              required 
              type="tel" 
              className="form-input"
              style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem', textAlign: 'center' }} 
              placeholder="Enter your number" 
              value={formData.number} 
              onChange={(e) => setFormData({...formData, number: e.target.value})} 
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '0.5rem', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interested Course</label>
            <select 
              required 
              className="form-select"
              style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem', backgroundColor: 'white', textAlign: 'center', textAlignLast: 'center' }} 
              value={formData.course} 
              onChange={(e) => setFormData({...formData, course: e.target.value})}
            >
              <option disabled>Select a course</option>
              <option>Full stack</option>
              <option>GenAI & ML</option>
              <option>Digital Marketing</option>
              <option>Data Analyst</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              width: '100%', 
              padding: '1.125rem', 
              borderRadius: '12px', 
              fontWeight: '700', 
              marginTop: '0.5rem',
              fontSize: '1rem'
            }}
          >
            Connect on WhatsApp
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ApplyModal;
